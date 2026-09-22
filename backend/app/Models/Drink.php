<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Drink extends Model
{
    protected $fillable = [
        'name', 'category', 'description', 'price',
        'available', 'image', 'sort_order',
    ];

    protected $casts = [
        'available' => 'boolean',
        'price' => 'float',
    ];
}
