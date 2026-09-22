<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate(['email' => 'required|email|max:255']);

        NewsletterSubscriber::firstOrCreate(
            ['email' => $request->email],
            ['active' => true]
        );

        return response()->json([
            'message' => 'Thank you for subscribing! You\'ll receive our latest updates.',
        ]);
    }
}
