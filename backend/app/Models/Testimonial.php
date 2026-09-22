<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['name', 'avatar', 'rating', 'review', 'approved'];

    protected $casts = [
        'approved' => 'boolean',
        'rating' => 'integer',
    ];
}
