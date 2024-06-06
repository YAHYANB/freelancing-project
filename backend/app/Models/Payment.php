<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'seller_id',
        'buyer_id',
        'gig_id',
        'transaction_id',
        'amount',
        'status',
    ];

    // Relationships

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function gig()
    {
        return $this->belongsTo(Gig::class);
    }
}
