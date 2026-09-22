<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        $path = $request->file('image')->store('uploads', 'public');
        $url  = asset('storage/' . $path);

        return response()->json([
            'url'  => $url,
            'path' => $path,
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate(['path' => 'required|string']);

        if (Storage::disk('public')->exists($request->path)) {
            Storage::disk('public')->delete($request->path);
        }

        return response()->json(['message' => 'Image deleted.']);
    }
}
