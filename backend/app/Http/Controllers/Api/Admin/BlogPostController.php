<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    public function index()
    {
        return response()->json(['data' => BlogPost::latest('published_at')->get()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'nullable|string|max:100',
            'excerpt'      => 'nullable|string',
            'content'      => 'nullable|string',
            'image'        => 'nullable|string',
            'author'       => 'nullable|string|max:255',
            'published'    => 'boolean',
            'published_at' => 'nullable|date',
        ]);
        $data['slug'] = Str::slug($data['title']);
        return response()->json(['data' => BlogPost::create($data)], 201);
    }

    public function show(BlogPost $blogPost)
    {
        return response()->json(['data' => $blogPost]);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $data = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'category'     => 'nullable|string|max:100',
            'excerpt'      => 'nullable|string',
            'content'      => 'nullable|string',
            'image'        => 'nullable|string',
            'author'       => 'nullable|string|max:255',
            'published'    => 'boolean',
            'published_at' => 'nullable|date',
        ]);
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        $blogPost->update($data);
        return response()->json(['data' => $blogPost]);
    }

    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();
        return response()->json(null, 204);
    }
}
