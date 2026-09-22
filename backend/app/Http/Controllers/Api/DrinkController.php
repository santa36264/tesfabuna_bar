<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Drink;
use Illuminate\Http\Request;

class DrinkController extends Controller
{
    public function index(Request $request)
    {
        $query = Drink::where('available', true)->orderBy('sort_order');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return response()->json(['data' => $query->get()]);
    }

    public function show(Drink $drink)
    {
        return response()->json(['data' => $drink]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string',
        ]);

        return response()->json(['data' => Drink::create($validated)], 201);
    }

    public function update(Request $request, Drink $drink)
    {
        $drink->update($request->validate([
            'name' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'available' => 'boolean',
            'image' => 'nullable|string',
        ]));

        return response()->json(['data' => $drink]);
    }

    public function destroy(Drink $drink)
    {
        $drink->delete();
        return response()->json(null, 204);
    }
}
