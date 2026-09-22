<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index()
    {
        return response()->json(['data' => GalleryImage::orderBy('sort_order')->get()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category'   => 'required|string|max:100',
            'src'        => 'required|string',
            'alt'        => 'nullable|string|max:255',
            'active'     => 'boolean',
            'sort_order' => 'integer',
        ]);
        return response()->json(['data' => GalleryImage::create($data)], 201);
    }

    public function update(Request $request, GalleryImage $galleryImage)
    {
        $data = $request->validate([
            'category'   => 'sometimes|string|max:100',
            'alt'        => 'nullable|string|max:255',
            'active'     => 'boolean',
            'sort_order' => 'integer',
        ]);
        $galleryImage->update($data);
        return response()->json(['data' => $galleryImage]);
    }

    public function destroy(GalleryImage $galleryImage)
    {
        // Delete stored file if it's a local upload
        if ($galleryImage->path) {
            Storage::disk('public')->delete($galleryImage->path);
        }
        $galleryImage->delete();
        return response()->json(null, 204);
    }
}
