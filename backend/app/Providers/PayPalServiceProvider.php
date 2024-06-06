<?php
namespace App\Providers;

use PayPal\Api\Amount;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
use PayPal\Api\Payout;
use PayPal\Api\PayoutSenderBatchHeader;
use PayPal\Api\PayoutItem;
use PayPal\Api\Currency;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Log;
use PayPal\Exception\PayPalConnectionException;
use PayPal\Api\Refund;
use PayPal\Api\Capture;
use PayPal\Api\Sale;

class PayPalService extends ServiceProvider
{
    private $apiContext;

    public function __construct()
    {
        $this->apiContext = new ApiContext(
            new OAuthTokenCredential(
                config('paypal.client_id'),
                config('paypal.secret')
            )
        );

        $this->apiContext->setConfig(config('paypal.settings'));
    }

    public function createPayout($email, $amount, $currency = 'USD')
    {
        // Log::info('Creating payout for email: ' . $email . ' with amount: ' . $amount . ' ' . $currency);
        $payouts = new Payout();

        $senderBatchHeader = new PayoutSenderBatchHeader();
        $senderBatchHeader->setSenderBatchId(uniqid())
            ->setEmailSubject("You have a payout!");

        $senderItem = new PayoutItem();
        $senderItem->setRecipientType('Email')
            ->setReceiver($email)
            ->setAmount(new Currency([
                'value' => $amount,
                'currency' => $currency
            ]));

        $payouts->setSenderBatchHeader($senderBatchHeader)
            ->addItem($senderItem);

        try {
            $output = $payouts->create([], $this->apiContext);
            return $output;
        } catch (\Exception $ex) {
            return null;
        }
    }


    public function refund($transactionId, $amount)
    {
        try {
            // Get sale by transaction ID
            
            $sale = Sale::get($transactionId, $this->apiContext);

            // Create refund object
            $refund = new Refund();
            $refundAmount = new Amount();
            $refundAmount->setTotal($amount)
                ->setCurrency('USD');
            $refund->setAmount($refundAmount);

            // Process refund
            $refund = $sale->refund($refund, $this->apiContext);

            // Check if refund was successful
            if ($refund->getState() === 'completed') {
                return true; // Refund successful
            } else {
                return false; // Refund failed
            }
        } catch (\Exception $e) {
            // Log and handle the exception
            return false; // Refund failed
        }
    }
}