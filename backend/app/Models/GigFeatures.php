<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GigFeatures extends Model
{
    use HasFactory;
    protected $fillable = [
        'gig_id',
        'feature'
    ];

    public function gig()
    {
        return $this->belongsTo(Gig::class);
    }
}
