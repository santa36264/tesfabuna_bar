<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = GalleryImage::where('active', true)->orderBy('sort_order');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return response()->json(['data' => $query->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category'   => 'required|string|max:100',
            'src'        => 'required|string',
            'alt'        => 'nullable|string|max:255',
            'sort_order' => 'integer',
        ]);

        return response()->json(['data' => GalleryImage::create($validated)], 201);
    }

    public function destroy(GalleryImage $galleryImage)
    {
        $galleryImage->delete();
        return response()->json(null, 204);
    }
}
