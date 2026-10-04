import path from 'node:path'
import express from 'express'
import cors from 'cors'

import config from './config/index.js'
import db from './db/index.js'
import routes from './routes/index.js'
import ApiError from './utils/ApiError.js'
import { ensureUploadDir } from './utils/storage.js'

const app = express()

/* ── CORS ───────────────────────────────────────────────── */

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin/curl requests arrive without an Origin header.
      if (!origin) return callback(null, true)
      if (config.app.frontendUrls.includes(origin)) return callback(null, true)
      return callback(new ApiError(403, `Origin ${origin} is not allowed by CORS.`))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
    maxAge: 86400,
  }),
)

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))

/* ── uploaded media ─────────────────────────────────────── */

app.use(
  config.uploads.urlPrefix,
  express.static(config.uploads.dir, { maxAge: '7d', index: false, dotfiles: 'deny' }),
)

/* ── health ─────────────────────────────────────────────── */

app.get('/up', (_req, res) => res.json({ status: 'ok' }))

/* ── api ────────────────────────────────────────────────── */

app.use('/api', routes)

/* ── 404 ────────────────────────────────────────────────── */

app.use((req, _res, next) => {
  next(ApiError.notFound(`The route ${req.method} ${req.originalUrl} could not be found.`))
})

/* ── error handler ──────────────────────────────────────── */

app.use((error, req, res, _next) => {
  // body-parser failures arrive as plain errors with a `type`.
  if (error?.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Malformed JSON payload.' })
  }

  if (error?.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Payload too large.' })
  }

  if (error instanceof ApiError) {
    return res.status(error.status).json(error.toJSON())
  }

  // PostgreSQL unique violation -> 422 with a Laravel-style bag.
  if (error?.code === '23505') {
    const constraint = String(error.constraint ?? '')
    const match = constraint.match(/^(\w+?)_.*_unique$/)
    const field = match ? match[1].replace(/_(.)/g, (_, c) => c.toUpperCase()) : 'value'
    return res
      .status(422)
      .json({ message: 'The given data was invalid.', errors: { [field]: ['The ' + field.replace(/([A-Z])/g, ' $1').toLowerCase() + ' has already been taken.'] } })
  }

  // PostgreSQL check / enum violation -> 422.
  if (error?.code === '23514' || error?.code === '22P02') {
    return res.status(422).json({ message: 'The given data was invalid.' })
  }

  // Database unreachable.
  if (error?.code === 'ECONNREFUSED' || error?.code === '57P03') {
    return res.status(503).json({
      message: `Database unavailable (${error.code}). Check the DB_* values in server/.env.`,
    })
  }

  console.error(`[error] ${req.method} ${req.originalUrl}`, error)

  const body = { message: config.app.debug ? error.message : 'Server Error.' }
  return res.status(error.status || 500).json(body)
})

/* ── startup ────────────────────────────────────────────── */

export const init = async () => {
  await ensureUploadDir()
  await db.raw('select 1')
}

export default app