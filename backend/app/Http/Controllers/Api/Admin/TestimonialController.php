<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Testimonial::latest()->get()]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate(['approved' => 'required|boolean']);
        $testimonial->update($data);
        return response()->json(['data' => $testimonial]);
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return response()->json(null, 204);
    }
}
