<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\User;
use App\Providers\PayPalService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
// use App\Providers\PayPalService;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Facades\Log;

class PaypalController extends Controller
{
    protected $payPalService;

    public function __construct(PayPalService $payPalService)
    {
        $this->payPalService = $payPalService;
    }

    public function payment(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $request->price
                    ],
                    "custom_id" => json_encode([
                        "userId" => Auth()->id(),
                        "gigId" => $request->id,
                    ])
                ]
            ],
            "application_context" => [
                "return_url" => route('payment.success'),
                "cancel_url" => route('payment.cancel')
            ],
        ]);

        if (isset($response['id']) && $response['id'] != null) {
            foreach ($response['links'] as $link) {
                if ($link['rel'] == 'approve') {
                    return response()->json(['link' => $link['href']]);
                }
            }
        } else {
            return redirect()->route('payment.cancel');
        }
    }

    public function cancel(Request $request)
    {
        return response()->json(['message' => 'Your payment is canceled.']);

    }

    public function success(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request->token);
        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            $customId = json_decode($response['purchase_units'][0]['payments']['captures'][0]['custom_id'], true);
            $gig = Gig::findOrFail($customId['gigId']);
            $order = Order::create([
                'seller_id' => $gig->user_id,
                'buyer_id' => $customId['userId'],
                'gig_id' => $gig->id,
                'description' => "this gig's title is " . $gig->title,
                'total_amount' => $gig->price,
                'transaction_id' => $response['id'],
                'image' => $gig->coverImage,
                'status' => 'pendig'
            ]);

            Payment::create([
                'order_id' => $order->id,
                'seller_id' => $gig->user_id,
                'buyer_id' => $customId['userId'],
                'gig_id' => $gig->id,
                'transaction_id' => $response['id'],
                'amount' => $gig->price,
                'status' => 'pendig'
            ]);

            return redirect("https://www.sandbox.paypal.com/checkoutnow?token={$request->token}");
        }
    }

    public function createPayout(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'amount' => 'required|numeric|min:1|max:500',
        ]);

        $email = $request->email;
        $amount = $request->amount;
        $user = $request->user();
        if ($user->total_earnings < $amount) {
            return response()->json(['message' => 'Insufficient amount'], 400);
        }

        $withdrawnToday = $user->payouts()
            ->whereDate('created_at', Carbon::today())
            ->sum('amount');

        if (($withdrawnToday + $amount) > 500) {
            return response()->json(['message' => 'Maximum daily withdrawal limit of $500 exceeded'], 400);
        }

        $percentage = config('settings.website_percentage');
        $finalAmount = $amount - ($amount * $percentage / 100);
        $result = $this->payPalService->createPayout($email, $finalAmount);
        if ($result) {
            $user->payouts()->create([
                'amount' => $amount,
                'email' => $email,
            ]);
            $user->total_earnings -= $amount;
            $user->save();

            return response()->json(['message' => 'your money withdrawn successffully']);
        } else {
            return response()->json(['message' => 'Error occured during the operation']);
        }
    }

    public function processRefund($orderId)
    {
        $order = Order::find($orderId);
        if (!$order) {
            return response()->json(['error' => 'Payment not found.'], 404);
        }

        $result = $this->payPalService->refund($order->transaction_id, $order->total_amount);


        if ($result) {
            DB::transaction(function () use ($order) {
                $order->status = 'rejected';
                $order->save();
            });
            return response()->json(['message' => 'Refund processed successfully.']);
        } else {
            return response()->json(['error' => 'Failed to process refund.'], 500);
        }
    }
    public function acceptOrder($orderId)
    {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $user = User::find($order->seller_id);

        if (!$user) {
            return response()->json(['message' => 'Seller not found'], 404);
        }

        DB::transaction(function () use ($order, $user) {
            $payment = Payment::where('order_id', $order->id)->first();
            if ($payment) {
                $payment->status = 'completed';
                $payment->save();
            }

            $order->status = 'accepted';
            $order->save();

            $user->total_earnings += $order->total_amount;
            $user->save();
        });

        return response()->json(['message' => 'Money received successfully','status'=> 200]);
    }
}
