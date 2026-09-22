<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index(Request $request)
    {
        $query = MenuItem::available()->orderBy('sort_order');

        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($sub) use ($q) {
                $sub->where('name', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%");
            });
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }

    public function show(MenuItem $menuItem)
    {
        return response()->json(['data' => $menuItem]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'calories' => 'nullable|integer|min:0',
            'popular' => 'boolean',
            'available' => 'boolean',
            'image' => 'nullable|string',
        ]);

        $item = MenuItem::create($validated);

        return response()->json(['data' => $item], 201);
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'calories' => 'nullable|integer|min:0',
            'popular' => 'boolean',
            'available' => 'boolean',
            'image' => 'nullable|string',
        ]);

        $menuItem->update($validated);

        return response()->json(['data' => $menuItem]);
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();
        return response()->json(null, 204);
    }
}
