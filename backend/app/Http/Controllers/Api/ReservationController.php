<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Reservation::orderBy('date')->orderBy('time')->get()]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'phone'            => 'required|string|max:30',
            'date'             => 'required|date|after_or_equal:today',
            'time'             => 'required|string|max:20',
            'guests'           => 'required|integer|min:1|max:50',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        $reservation = Reservation::create($validated);

        return response()->json([
            'data' => $reservation,
            'message' => 'Reservation confirmed! We look forward to seeing you.',
        ], 201);
    }

    public function show(Reservation $reservation)
    {
        return response()->json(['data' => $reservation]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $reservation->update($request->validate([
            'status' => 'in:pending,confirmed,cancelled',
        ]));

        return response()->json(['data' => $reservation]);
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json(null, 204);
    }
}
