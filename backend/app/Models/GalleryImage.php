<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    protected $fillable = ['category', 'src', 'alt', 'active', 'sort_order', 'path'];

    protected $casts = ['active' => 'boolean'];
}
