<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Reservation::latest()->get()]);
    }

    public function show(Reservation $reservation)
    {
        return response()->json(['data' => $reservation]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $data = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);
        $reservation->update($data);
        return response()->json(['data' => $reservation]);
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json(null, 204);
    }

    public function stats()
    {
        return response()->json([
            'total'     => Reservation::count(),
            'pending'   => Reservation::where('status', 'pending')->count(),
            'confirmed' => Reservation::where('status', 'confirmed')->count(),
            'cancelled' => Reservation::where('status', 'cancelled')->count(),
        ]);
    }
}
