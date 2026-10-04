import db from '../db/index.js'
import { hashToken } from '../utils/token.js'
import ApiError from '../utils/ApiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import { serializeUser } from '../models/user.js'

/**
 * Port of Laravel's `auth:sanctum`.
 *
 * Reads the Bearer token, resolves the owning user and stamps `req.user` /
 * `req.accessToken`. Responds 401 "Unauthenticated." exactly like Sanctum,
 * because the admin SPA branches on the 401 status code.
 */
const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || ''
  const [scheme, plaintext] = header.split(' ')

  if (!plaintext || scheme.toLowerCase() !== 'bearer') {
    throw ApiError.unauthenticated()
  }

  const record = await db('personal_access_tokens')
    .where('token', hashToken(plaintext.trim()))
    .where('tokenable_type', 'users')
    .first()

  if (!record) throw ApiError.unauthenticated()

  if (record.expires_at && new Date(record.expires_at).getTime() <= Date.now()) {
    await db('personal_access_tokens').where('id', record.id).del()
    throw ApiError.unauthenticated()
  }

  const user = await db('users').where('id', record.tokenable_id).first()
  if (!user) throw ApiError.unauthenticated()

  // Best-effort activity stamp; never blocks the request.
  db('personal_access_tokens')
    .where('id', record.id)
    .update({ last_used_at: new Date(), updated_at: new Date() })
    .catch(() => {})

  // `user` is safe to serialise into responses; `userRecord` keeps the raw row
  // (including the password hash) for credential checks.
  req.user = serializeUser(user)
  req.userRecord = user
  req.accessToken = record
  return next()
})

export default authenticate