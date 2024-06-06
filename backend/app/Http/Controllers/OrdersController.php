<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrdersController extends Controller
{
    public function index($userId)
    {
        try {
            $user = User::findOrFail($userId);
            $orders = Order::where('user_id', $user->id)->with(['buyer','seller','payments','gig'])->get();
            return response()->json($orders);
        } catch (\Exception $err) {
            return response()->json(['error' => 'error occured while fetching user', $err->getMessage()], 500);
        }
    }
    public function pollOrders($userId)
    {
        $orders = Order::where(function ($query) use ($userId) {
            $query->where('buyer_id', $userId)
                ->where('buyer_seen', 0)
                ->orWhere('seller_id', $userId)
                ->where('seller_seen', 0);
        })
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($orders);
    }
    public function orderSeen($userId)
    {
        Order::where('buyer_id', $userId)
            ->update(['buyer_seen' => 1]);

        Order::where('seller_id', $userId)
            ->update(['seller_seen' => 1]);


        return response()->json(['message' => 'Orders marked as seen']);
    }
}
