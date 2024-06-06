<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'seller_id',
        'gig_id',
        'description',
        'total_amount',
        'transaction_id',
        'status',
        'image'
    ];


    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function gig()
    {
        return $this->belongsTo(Gig::class);
    }
}
