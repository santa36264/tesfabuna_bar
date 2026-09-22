<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Testimonial::where('approved', true)->latest()->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|string|max:1000',
            'avatar' => 'nullable|string',
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json([
            'data' => $testimonial,
            'message' => 'Thank you for your review! It will appear after moderation.',
        ], 201);
    }

    public function show(Testimonial $testimonial)
    {
        return response()->json(['data' => $testimonial]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $testimonial->update($request->validate(['approved' => 'boolean']));
        return response()->json(['data' => $testimonial]);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return response()->json(null, 204);
    }
}
