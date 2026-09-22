<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\ContactMessage;
use App\Models\Drink;
use App\Models\GalleryImage;
use App\Models\MenuItem;
use App\Models\NewsletterSubscriber;
use App\Models\Reservation;
use App\Models\Testimonial;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'menu_items'    => MenuItem::count(),
            'drinks'        => Drink::count(),
            'gallery'       => GalleryImage::count(),
            'blog_posts'    => BlogPost::count(),
            'reservations'  => [
                'total'     => Reservation::count(),
                'pending'   => Reservation::where('status', 'pending')->count(),
                'confirmed' => Reservation::where('status', 'confirmed')->count(),
                'cancelled' => Reservation::where('status', 'cancelled')->count(),
            ],
            'testimonials'  => [
                'total'    => Testimonial::count(),
                'pending'  => Testimonial::where('approved', false)->count(),
                'approved' => Testimonial::where('approved', true)->count(),
            ],
            'messages'      => [
                'total'  => ContactMessage::count(),
                'unread' => ContactMessage::where('read', false)->count(),
            ],
            'subscribers'   => NewsletterSubscriber::where('active', true)->count(),
        ]);
    }

    public function recentReservations()
    {
        return response()->json([
            'data' => Reservation::latest()->take(10)->get(),
        ]);
    }

    public function recentMessages()
    {
        return response()->json([
            'data' => ContactMessage::where('read', false)->latest()->take(10)->get(),
        ]);
    }
}
