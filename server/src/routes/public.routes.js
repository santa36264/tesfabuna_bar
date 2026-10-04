import { Router } from 'express'
import validate from '../utils/validate.js'
import asyncHandler from '../utils/asyncHandler.js'

import * as auth from '../controllers/auth.controller.js'
import * as menuItem from '../controllers/menuItem.controller.js'
import * as drink from '../controllers/drink.controller.js'
import * as gallery from '../controllers/gallery.controller.js'
import * as blogPost from '../controllers/blogPost.controller.js'
import * as testimonial from '../controllers/testimonial.controller.js'
import * as reservation from '../controllers/reservation.controller.js'
import * as newsletter from '../controllers/newsletter.controller.js'
import * as contact from '../controllers/contact.controller.js'

import {
  loginSchema,
  testimonialStoreSchema,
  reservationStoreSchema,
  contactSchema,
  newsletterSchema,
} from '../validators/index.js'

/*
|--------------------------------------------------------------------------
| Public routes - no authentication required
|--------------------------------------------------------------------------
| Mirrors routes/api.php in the Laravel app. Content is read-only here; every
| write goes through /admin behind `auth:sanctum` + the admin role check.
*/
const router = Router()

/* ── auth ───────────────────────────────────────────────── */

router.post('/auth/login', validate(loginSchema), asyncHandler(auth.login))

/* ── menu ───────────────────────────────────────────────── */

router.get('/menu-items', asyncHandler(menuItem.index))
router.get('/menu-items/:id', asyncHandler(menuItem.show))

/* ── drinks ─────────────────────────────────────────────── */

router.get('/drinks', asyncHandler(drink.index))
router.get('/drinks/:id', asyncHandler(drink.show))

/* ── gallery ────────────────────────────────────────────── */

router.get('/gallery', asyncHandler(gallery.index))

/* ── blog ───────────────────────────────────────────────── */

router.get('/blog', asyncHandler(blogPost.index))
router.get('/blog/:id', asyncHandler(blogPost.show))

/* ── testimonials (approved only) ───────────────────────── */

router.get('/testimonials', asyncHandler(testimonial.index))
router.post('/testimonials', validate(testimonialStoreSchema), asyncHandler(testimonial.store))

/* ── reservations ───────────────────────────────────────── */

router.post('/reservations', validate(reservationStoreSchema), asyncHandler(reservation.store))

/* ── newsletter ─────────────────────────────────────────── */

router.post('/newsletter/subscribe', validate(newsletterSchema), asyncHandler(newsletter.subscribe))

/* ── contact ────────────────────────────────────────────── */

router.post('/contact', validate(contactSchema), asyncHandler(contact.send))

export default router