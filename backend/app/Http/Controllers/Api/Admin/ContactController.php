<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(['data' => ContactMessage::latest()->get()]);
    }

    public function show(ContactMessage $contactMessage)
    {
        $contactMessage->update(['read' => true]);
        return response()->json(['data' => $contactMessage]);
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return response()->json(null, 204);
    }
}
