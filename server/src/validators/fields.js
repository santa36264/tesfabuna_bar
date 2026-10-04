import { z } from 'zod'
import * as messages from '../utils/messages.js'

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

/** YYYY-MM-DD in local time, matching Laravel's `date` validation. */
export const todayString = () => {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export const isCalendarDate = (value) => {
  if (typeof value !== 'string' || !DATE_RE.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  )
}

/**
 * Accepts the ISO datetime strings an admin form may send and narrows them
 * down to the calendar date the column actually stores.
 */
export const normaliseDateInput = (value) => {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return value
    return value.toISOString().slice(0, 10)
  }
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed === '') return undefined
    const iso = trimmed.match(/^(\d{4}-\d{2}-\d{2})[T ]/)
    return iso ? iso[1] : trimmed
  }
  return value
}

/** Laravel's boolean rule accepted true/false/1/0/"1"/"0". */
export const toBoolean = (value) => {
  if (value === undefined || value === null || value === '') return value
  if (typeof value === 'string') return ['1', 'true', 'on', 'yes'].includes(value.toLowerCase())
  if (typeof value === 'number') return value !== 0
  return value
}

export const toNumber = (value) => {
  if (typeof value === 'boolean') return Number(value)
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed === '' ? undefined : Number(trimmed)
  }
  return value
}

/*
|--------------------------------------------------------------------------
| Field builders
|--------------------------------------------------------------------------
| These intentionally do not pass Zod's `error` / `errorMap` params: Zod 4
| ignores several of the v3 spellings, and src/utils/validationError.js
| already maps every issue code to Laravel's wording.
*/

/* ── strings ────────────────────────────────────────────── */

/**
 * Laravel's `required` rejects null, undefined *and* blank strings, so a
 * required field carries min(1). The error mapper turns `too_small` with a
 * minimum of 1 back into "The x field is required."
 */
export const requiredString = (field, max = 255) =>
  z.string().min(1).max(max, messages.stringMax(field, max))

/** Laravel's `sometimes|string` - present but allowed to be blank. */
export const optionalString = (field, max = 255) =>
  z.string().max(max, messages.stringMax(field, max)).optional()

/** Laravel's `nullable|string` - absent, null or blank all allowed. */
export const nullableString = (field, max = 255) =>
  z.string().max(max, messages.stringMax(field, max)).nullable().optional()

/* ── email ──────────────────────────────────────────────── */

export const requiredEmail = (field = 'email', max = 255) =>
  z
    .string()
    .min(1)
    .max(max, messages.emailMax(field, max))
    .refine((value) => EMAIL_RE.test(value), messages.validEmail(field))

export const optionalEmail = (field = 'email', max = 255) =>
  z.string().max(max, messages.emailMax(field, max)).refine((v) => EMAIL_RE.test(v), messages.validEmail(field)).optional()

/* ── numbers ────────────────────────────────────────────── */

export const requiredNumber = (field, { min = 0, max } = {}) => {
  let schema = z.number().min(min, messages.minValue(field, min))
  if (max !== undefined) schema = schema.max(max, messages.maxValue(field, max))
  return z.preprocess(toNumber, schema)
}

export const optionalNumber = (field, options = {}) => requiredNumber(field, options).optional()

export const requiredInteger = (field, { min, max } = {}) => {
  let schema = z.number().int(messages.mustBeInteger(field))
  if (min !== undefined) schema = schema.min(min, messages.minValue(field, min))
  if (max !== undefined) schema = schema.max(max, messages.maxValue(field, max))
  return z.preprocess(toNumber, schema)
}

export const optionalInteger = (field, options = {}) => requiredInteger(field, options).optional()

/* ── booleans ───────────────────────────────────────────── */

export const optionalBoolean = () => z.preprocess(toBoolean, z.boolean().optional())

export const requiredBoolean = () => z.preprocess(toBoolean, z.boolean())

/* ── dates ──────────────────────────────────────────────── */

export const requiredDate = (field) =>
  z.preprocess(
    normaliseDateInput,
    z
      .string()
      .refine(isCalendarDate, messages.validDate(field))
      .refine((value) => value >= todayString(), messages.afterOrEqualToday(field)),
  )

/** Laravel `nullable|date` for timestamptz columns. */
export const nullableDateTime = () =>
  z.preprocess(
    (value) => {
      if (value === undefined) return undefined
      if (value === null || value === '') return null
      if (value instanceof Date) return value
      const parsed = new Date(value)
      return Number.isNaN(parsed.getTime()) ? value : parsed
    },
    z.union([z.date(), z.string()]).nullable().optional(),
  )

export const requiredEnum = (field, values) => z.enum(values)

export const optionalEnum = (field, values) => z.enum(values).optional()

export default {
  EMAIL_RE,
  todayString,
  isCalendarDate,
  normaliseDateInput,
  toBoolean,
  toNumber,
}