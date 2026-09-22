<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index()
    {
        return response()->json(['data' => MenuItem::orderBy('sort_order')->get()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'calories'    => 'nullable|integer|min:0',
            'popular'     => 'boolean',
            'available'   => 'boolean',
            'image'       => 'nullable|string',
            'sort_order'  => 'integer',
        ]);
        return response()->json(['data' => MenuItem::create($data)], 201);
    }

    public function show(MenuItem $menuItem)
    {
        return response()->json(['data' => $menuItem]);
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'category'    => 'sometimes|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'sometimes|numeric|min:0',
            'calories'    => 'nullable|integer|min:0',
            'popular'     => 'boolean',
            'available'   => 'boolean',
            'image'       => 'nullable|string',
            'sort_order'  => 'integer',
        ]);
        $menuItem->update($data);
        return response()->json(['data' => $menuItem]);
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();
        return response()->json(null, 204);
    }
}
