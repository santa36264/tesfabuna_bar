<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Drink;
use Illuminate\Http\Request;

class DrinkController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Drink::orderBy('sort_order')->get()]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'required|numeric|min:0',
            'available'   => 'boolean',
            'image'       => 'nullable|string',
            'sort_order'  => 'integer',
        ]);
        return response()->json(['data' => Drink::create($data)], 201);
    }

    public function show(Drink $drink)
    {
        return response()->json(['data' => $drink]);
    }

    public function update(Request $request, Drink $drink)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'category'    => 'sometimes|string|max:100',
            'description' => 'nullable|string',
            'price'       => 'sometimes|numeric|min:0',
            'available'   => 'boolean',
            'image'       => 'nullable|string',
            'sort_order'  => 'integer',
        ]);
        $drink->update($data);
        return response()->json(['data' => $drink]);
    }

    public function destroy(Drink $drink)
    {
        $drink->delete();
        return response()->json(null, 204);
    }
}
