import { Router } from 'express'
import validate from '../utils/validate.js'
import asyncHandler from '../utils/asyncHandler.js'
import authenticate from '../middleware/authenticate.js'
import admin from '../middleware/admin.js'
import uploadImage from '../middleware/upload.js'

import * as auth from '../controllers/auth.controller.js'
import * as dashboard from '../controllers/admin/dashboard.controller.js'
import * as profile from '../controllers/admin/profile.controller.js'
import * as imageUpload from '../controllers/admin/imageUpload.controller.js'
import * as menuItem from '../controllers/admin/menuItem.controller.js'
import * as drink from '../controllers/admin/drink.controller.js'
import * as gallery from '../controllers/admin/gallery.controller.js'
import * as blogPost from '../controllers/admin/blogPost.controller.js'
import * as reservation from '../controllers/admin/reservation.controller.js'
import * as testimonial from '../controllers/admin/testimonial.controller.js'
import * as contact from '../controllers/admin/contact.controller.js'

import {
  profileUpdateSchema,
  passwordChangeSchema,
  uploadDeleteSchema,
  menuItemStoreSchema,
  menuItemUpdateSchema,
  drinkStoreSchema,
  drinkUpdateSchema,
  galleryStoreSchema,
  galleryUpdateSchema,
  blogPostStoreSchema,
  blogPostUpdateSchema,
  reservationStatusSchema,
  testimonialUpdateSchema,
} from '../validators/index.js'

/*
|--------------------------------------------------------------------------
| Admin routes - `auth:sanctum` + `admin` role
|--------------------------------------------------------------------------
| Same paths and verbs as routes/api.php in the Laravel app, so the Vue admin
| panel needs no changes.
*/
const router = Router()

router.use(authenticate, admin)

/* ── auth ───────────────────────────────────────────────── */

router.post('/logout', asyncHandler(auth.logout))
router.get('/me', asyncHandler(auth.me))

/* ── profile ────────────────────────────────────────────── */

router.get('/profile', asyncHandler(profile.show))
router.put('/profile', validate(profileUpdateSchema), asyncHandler(profile.update))
router.put('/profile/password', validate(passwordChangeSchema), asyncHandler(profile.changePassword))

/* ── dashboard ──────────────────────────────────────────── */

router.get('/dashboard/stats', asyncHandler(dashboard.stats))
router.get('/dashboard/recent-reservations', asyncHandler(dashboard.recentReservations))
router.get('/dashboard/recent-messages', asyncHandler(dashboard.recentMessages))

/* ── image upload ───────────────────────────────────────── */

router.post('/upload', uploadImage, asyncHandler(imageUpload.upload))
router.delete('/upload', validate(uploadDeleteSchema, 'body'), asyncHandler(imageUpload.remove))

/* ── menu items CRUD ────────────────────────────────────── */

router.get('/menu-items', asyncHandler(menuItem.index))
router.post('/menu-items', validate(menuItemStoreSchema), asyncHandler(menuItem.store))
router.get('/menu-items/:id', asyncHandler(menuItem.show))
router.put('/menu-items/:id', validate(menuItemUpdateSchema), asyncHandler(menuItem.update))
router.delete('/menu-items/:id', asyncHandler(menuItem.destroy))

/* ── drinks CRUD ────────────────────────────────────────── */

router.get('/drinks', asyncHandler(drink.index))
router.post('/drinks', validate(drinkStoreSchema), asyncHandler(drink.store))
router.get('/drinks/:id', asyncHandler(drink.show))
router.put('/drinks/:id', validate(drinkUpdateSchema), asyncHandler(drink.update))
router.delete('/drinks/:id', asyncHandler(drink.destroy))

/* ── gallery CRUD ───────────────────────────────────────── */

router.get('/gallery', asyncHandler(gallery.index))
router.post('/gallery', validate(galleryStoreSchema), asyncHandler(gallery.store))
router.get('/gallery/:id', asyncHandler(gallery.show))
router.put('/gallery/:id', validate(galleryUpdateSchema), asyncHandler(gallery.update))
router.delete('/gallery/:id', asyncHandler(gallery.destroy))

/* ── blog posts CRUD ────────────────────────────────────── */

router.get('/blog', asyncHandler(blogPost.index))
router.post('/blog', validate(blogPostStoreSchema), asyncHandler(blogPost.store))
router.get('/blog/:id', asyncHandler(blogPost.show))
router.put('/blog/:id', validate(blogPostUpdateSchema), asyncHandler(blogPost.update))
router.delete('/blog/:id', asyncHandler(blogPost.destroy))

/* ── reservations ───────────────────────────────────────── */

/* `/stats` must be declared before `/:id` or Express would match it as an id. */
router.get('/reservations', asyncHandler(reservation.index))
router.get('/reservations/stats', asyncHandler(reservation.stats))
router.get('/reservations/:id', asyncHandler(reservation.show))
router.put('/reservations/:id', validate(reservationStatusSchema), asyncHandler(reservation.update))
router.delete('/reservations/:id', asyncHandler(reservation.destroy))

/* ── testimonials ───────────────────────────────────────── */

router.get('/testimonials', asyncHandler(testimonial.index))
router.get('/testimonials/:id', asyncHandler(testimonial.show))
router.put(
  '/testimonials/:id',
  validate(testimonialUpdateSchema),
  asyncHandler(testimonial.update),
)
router.delete('/testimonials/:id', asyncHandler(testimonial.destroy))

/* ── contact messages ───────────────────────────────────── */

router.get('/messages', asyncHandler(contact.index))
router.get('/messages/:id', asyncHandler(contact.show))
router.delete('/messages/:id', asyncHandler(contact.destroy))

export default router