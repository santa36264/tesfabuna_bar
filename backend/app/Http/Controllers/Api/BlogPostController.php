<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => BlogPost::where('published', true)
                ->orderByDesc('published_at')
                ->get(),
        ]);
    }

    public function show($id)
    {
        $post = BlogPost::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        return response()->json(['data' => $post]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'nullable|string|max:100',
            'excerpt'      => 'nullable|string',
            'content'      => 'nullable|string',
            'image'        => 'nullable|string',
            'author'       => 'nullable|string|max:255',
            'published'    => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        return response()->json(['data' => BlogPost::create($validated)], 201);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'category'     => 'nullable|string|max:100',
            'excerpt'      => 'nullable|string',
            'content'      => 'nullable|string',
            'image'        => 'nullable|string',
            'author'       => 'nullable|string|max:255',
            'published'    => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $blogPost->update($validated);
        return response()->json(['data' => $blogPost]);
    }

    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();
        return response()->json(null, 204);
    }
}
