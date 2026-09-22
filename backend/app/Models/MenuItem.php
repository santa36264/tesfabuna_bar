<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'name', 'category', 'description', 'price',
        'calories', 'popular', 'available', 'image', 'sort_order',
    ];

    protected $casts = [
        'popular' => 'boolean',
        'available' => 'boolean',
        'price' => 'float',
    ];

    public function scopeAvailable($query)
    {
        return $query->where('available', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $category ? $query->where('category', $category) : $query;
    }
}
