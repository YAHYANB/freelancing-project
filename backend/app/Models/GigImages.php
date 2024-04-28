<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GigImages extends Model
{
    use HasFactory;
    protected $fillable = [
        'gig_id',
        'image'
    ];

    public function gig()
    {
        return $this->belongsTo(Gig::class);
    }
}
