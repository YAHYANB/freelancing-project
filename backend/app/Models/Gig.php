<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gig extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'category',
        'coverImage',
        'description',
        'serviceTitle',
        'shortDescription',
        'deliveryTime',
        'revisionNumber',
        'features',
        'price'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function images()
    {
        return $this->hasMany(GigImages::class);
    }
}
