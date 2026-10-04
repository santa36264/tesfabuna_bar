import { z } from 'zod'
import {
  requiredEmail,
  optionalEmail,
  requiredString,
  nullableString,
  optionalString,
  requiredNumber,
  optionalNumber,
  requiredInteger,
  optionalInteger,
  optionalBoolean,
  requiredBoolean,
  requiredDate,
  nullableDateTime,
  requiredEnum,
  optionalEnum,
} from './fields.js'

/*
|--------------------------------------------------------------------------
| Menu items
|--------------------------------------------------------------------------
*/
export const menuItemStoreSchema = z.object({
  name: requiredString('name'),
  category: requiredString('category', 100),
  description: nullableString('description'),
  price: requiredNumber('price', { min: 0 }),
  calories: optionalInteger('calories', { min: 0 }),
  popular: optionalBoolean(),
  available: optionalBoolean(),
  image: nullableString('image'),
  sort_order: optionalInteger('sort_order'),
})

export const menuItemUpdateSchema = z.object({
  name: optionalString('name'),
  category: optionalString('category', 100),
  description: nullableString('description'),
  price: optionalNumber('price', { min: 0 }),
  calories: optionalInteger('calories', { min: 0 }),
  popular: optionalBoolean(),
  available: optionalBoolean(),
  image: nullableString('image'),
  sort_order: optionalInteger('sort_order'),
})

/* ── drinks ─────────────────────────────────────────────── */

export const drinkStoreSchema = z.object({
  name: requiredString('name'),
  category: requiredString('category', 100),
  description: nullableString('description'),
  price: requiredNumber('price', { min: 0 }),
  available: optionalBoolean(),
  image: nullableString('image'),
  sort_order: optionalInteger('sort_order'),
})

export const drinkUpdateSchema = z.object({
  name: optionalString('name'),
  category: optionalString('category', 100),
  description: nullableString('description'),
  price: optionalNumber('price', { min: 0 }),
  available: optionalBoolean(),
  image: nullableString('image'),
  sort_order: optionalInteger('sort_order'),
})

/* ── reservations ───────────────────────────────────────── */

export const RESERVATION_STATUSES = ['pending', 'confirmed', 'cancelled']

export const reservationStoreSchema = z
  .object({
    name: requiredString('name'),
    email: requiredEmail('email'),
    phone: requiredString('phone', 30),
    date: requiredDate('date'),
    time: requiredString('time', 20),
    guests: requiredInteger('guests', { min: 1, max: 50 }),
    /*
     * The Vue form (frontend/src/views/ReservationView.vue) posts `special`,
     * while Laravel only accepted `special_requests` and silently dropped it.
     * Both keys are accepted and normalised to the column.
     */
    special: nullableString('special', 1000),
    special_requests: nullableString('special_requests', 1000),
  })
  .transform((data) => {
    const special = data.special_requests ?? data.special
    const payload = { ...data, special_requests: special ?? null }
    delete payload.special
    return payload
  })

export const reservationStatusSchema = z.object({
  status: requiredEnum('status', RESERVATION_STATUSES),
})

/* ── testimonials ───────────────────────────────────────── */

export const testimonialStoreSchema = z.object({
  name: requiredString('name'),
  rating: requiredInteger('rating', { min: 1, max: 5 }),
  review: requiredString('review', 1000),
  avatar: nullableString('avatar'),
})

export const testimonialUpdateSchema = z.object({
  approved: requiredBoolean('approved'),
})

/* ── blog posts ─────────────────────────────────────────── */

export const blogPostStoreSchema = z.object({
  title: requiredString('title'),
  category: nullableString('category', 100),
  excerpt: nullableString('excerpt'),
  content: nullableString('content'),
  image: nullableString('image'),
  author: nullableString('author'),
  published: optionalBoolean(),
  published_at: nullableDateTime(),
})

export const blogPostUpdateSchema = z.object({
  title: optionalString('title'),
  category: nullableString('category', 100),
  excerpt: nullableString('excerpt'),
  content: nullableString('content'),
  image: nullableString('image'),
  author: nullableString('author'),
  published: optionalBoolean(),
  published_at: nullableDateTime(),
})

/* ── gallery ────────────────────────────────────────────── */

export const galleryStoreSchema = z.object({
  category: requiredString('category', 100),
  src: requiredString('src'),
  alt: nullableString('alt'),
  active: optionalBoolean(),
  sort_order: optionalInteger('sort_order'),
})

export const galleryUpdateSchema = z.object({
  category: optionalString('category', 100),
  alt: nullableString('alt'),
  active: optionalBoolean(),
  sort_order: optionalInteger('sort_order'),
})

/* ── contact & newsletter ───────────────────────────────── */

export const contactSchema = z.object({
  name: requiredString('name'),
  email: requiredEmail('email'),
  subject: nullableString('subject'),
  message: requiredString('message', 2000),
})

export const newsletterSchema = z.object({
  email: requiredEmail('email'),
})

/* ── auth & profile ─────────────────────────────────────── */

export const loginSchema = z.object({
  email: requiredEmail('email'),
  password: requiredString('password'),
})

export const profileUpdateSchema = z.object({
  name: optionalString('name'),
  email: optionalEmail('email'),
  avatar: nullableString('avatar'),
})

export const PASSWORD_MIN = 8

export const passwordChangeSchema = z
  .object({
    // The Vue form posts `current`; Laravel only accepted `current_password`,
    // which made password changes fail validation every time.
    current: z.string().min(1).optional(),
    current_password: z.string().min(1).optional(),
    password: requiredString('password'),
    password_confirmation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.current && !data.current_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['current'],
        message: 'The current password field is required.',
      })
    }

    if (data.password_confirmation !== undefined && data.password !== data.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: 'The password field confirmation does not match.',
      })
    }

    if (data.password.length < PASSWORD_MIN) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: `The password field must be at least ${PASSWORD_MIN} characters.`,
      })
    }

    if (!/[A-Z]/.test(data.password) || !/[a-z]/.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: 'The password field must contain at least one uppercase and one lowercase letter.',
      })
    }

    if (!/\d/.test(data.password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: 'The password field must contain at least one number.',
      })
    }
  })
  .transform((data) => ({
    current_password: data.current ?? data.current_password,
    password: data.password,
  }))

/* ── uploads ────────────────────────────────────────────── */

export const uploadDeleteSchema = z.object({
  path: requiredString('path'),
})