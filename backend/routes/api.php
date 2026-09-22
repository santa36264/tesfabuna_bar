<?php

use Illuminate\Support\Facades\Route;

// ── Public API controllers ─────────────────────────────────────────────────
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\DrinkController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\NewsletterController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AuthController;

// ── Admin API controllers ──────────────────────────────────────────────────
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\ProfileController;
use App\Http\Controllers\Api\Admin\ImageUploadController;
use App\Http\Controllers\Api\Admin\MenuItemController    as AdminMenuController;
use App\Http\Controllers\Api\Admin\DrinkController       as AdminDrinkController;
use App\Http\Controllers\Api\Admin\GalleryController     as AdminGalleryController;
use App\Http\Controllers\Api\Admin\BlogPostController    as AdminBlogController;
use App\Http\Controllers\Api\Admin\ReservationController as AdminReservationController;
use App\Http\Controllers\Api\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\Api\Admin\ContactController     as AdminContactController;

// ══════════════════════════════════════════════════════════════════════
// PUBLIC ROUTES — no auth required
// ══════════════════════════════════════════════════════════════════════

// Auth
Route::post('/auth/login', [AuthController::class, 'login']);

// Menu
Route::get('/menu-items',        [MenuItemController::class, 'index']);
Route::get('/menu-items/{menuItem}', [MenuItemController::class, 'show']);

// Drinks
Route::get('/drinks',       [DrinkController::class, 'index']);
Route::get('/drinks/{drink}', [DrinkController::class, 'show']);

// Gallery
Route::get('/gallery', [GalleryController::class, 'index']);

// Blog
Route::get('/blog',      [BlogPostController::class, 'index']);
Route::get('/blog/{id}', [BlogPostController::class, 'show']);

// Testimonials (public — approved only)
Route::get('/testimonials',    [TestimonialController::class, 'index']);
Route::post('/testimonials',   [TestimonialController::class, 'store']);

// Reservation (customers submit)
Route::post('/reservations', [ReservationController::class, 'store']);

// Newsletter
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);

// Contact
Route::post('/contact', [ContactController::class, 'send']);

// ══════════════════════════════════════════════════════════════════════
// PROTECTED ADMIN ROUTES — requires Sanctum token + admin role
// ══════════════════════════════════════════════════════════════════════
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Profile management
    Route::get('/profile',           [ProfileController::class, 'show']);
    Route::put('/profile',           [ProfileController::class, 'update']);
    Route::put('/profile/password',  [ProfileController::class, 'changePassword']);

    // Dashboard
    Route::get('/dashboard/stats',               [DashboardController::class, 'stats']);
    Route::get('/dashboard/recent-reservations', [DashboardController::class, 'recentReservations']);
    Route::get('/dashboard/recent-messages',     [DashboardController::class, 'recentMessages']);

    // Image upload
    Route::post('/upload',        [ImageUploadController::class, 'upload']);
    Route::delete('/upload',      [ImageUploadController::class, 'delete']);

    // Menu Items CRUD
    Route::apiResource('menu-items', AdminMenuController::class);

    // Drinks CRUD
    Route::apiResource('drinks', AdminDrinkController::class);

    // Gallery CRUD
    Route::get('/gallery',                    [AdminGalleryController::class, 'index']);
    Route::post('/gallery',                   [AdminGalleryController::class, 'store']);
    Route::put('/gallery/{galleryImage}',     [AdminGalleryController::class, 'update']);
    Route::delete('/gallery/{galleryImage}',  [AdminGalleryController::class, 'destroy']);

    // Blog Posts CRUD
    Route::apiResource('blog', AdminBlogController::class);

    // Reservations (admin view + status update)
    Route::get('/reservations',             [AdminReservationController::class, 'index']);
    Route::get('/reservations/stats',       [AdminReservationController::class, 'stats']);
    Route::get('/reservations/{reservation}',    [AdminReservationController::class, 'show']);
    Route::put('/reservations/{reservation}',    [AdminReservationController::class, 'update']);
    Route::delete('/reservations/{reservation}', [AdminReservationController::class, 'destroy']);

    // Testimonials (approve/reject/delete)
    Route::get('/testimonials',                  [AdminTestimonialController::class, 'index']);
    Route::put('/testimonials/{testimonial}',    [AdminTestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [AdminTestimonialController::class, 'destroy']);

    // Contact messages
    Route::get('/messages',                  [AdminContactController::class, 'index']);
    Route::get('/messages/{contactMessage}', [AdminContactController::class, 'show']);
    Route::delete('/messages/{contactMessage}', [AdminContactController::class, 'destroy']);
});
