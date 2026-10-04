import bcrypt from 'bcryptjs'
import db from '../db/index.js'
import config from '../config/index.js'
import ApiError from '../utils/ApiError.js'
import { generateToken, hashToken } from '../utils/token.js'

/**
 * Issues an opaque access token and stores only its SHA-256 digest, which is how
 * Laravel Sanctum behaved. Existing bcrypt password hashes keep working because
 * bcryptjs verifies them unchanged.
 */
export const createToken = async (userId, name = config.auth.tokenName) => {
  const plaintext = generateToken()

  const expiresAt =
    config.auth.tokenTtlDays > 0
      ? new Date(Date.now() + config.auth.tokenTtlDays * 24 * 60 * 60 * 1000)
      : null

  await db('personal_access_tokens').insert({
    tokenable_type: 'users',
    tokenable_id: userId,
    name,
    token: hashToken(plaintext),
    abilities: JSON.stringify(['*']),
    expires_at: expiresAt,
  })

  return plaintext
}

export const revokeToken = async (tokenId) => {
  await db('personal_access_tokens').where('id', tokenId).del()
}

/** Revokes every token for a user except the one currently in use. */
export const revokeOtherTokens = async (userId, keepTokenId) => {
  await db('personal_access_tokens')
    .where('tokenable_type', 'users')
    .where('tokenable_id', userId)
    .modify((query) => {
      if (keepTokenId) query.whereNot('id', keepTokenId)
    })
    .del()
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await db('users').where('email', email).first()

  const passwordMatches = user ? await bcrypt.compare(password, user.password) : false

  if (!user || !passwordMatches) {
    throw ApiError.validation({ email: ['The provided credentials are incorrect.'] })
  }

  if (user.role !== 'admin') {
    throw ApiError.validation({ email: ['You do not have admin access.'] })
  }

  const token = await createToken(user.id)

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar ?? null,
    },
  })
}

export const logout = async (req, res) => {
  await revokeToken(req.accessToken.id)
  res.json({ message: 'Logged out successfully.' })
}

export const me = async (req, res) => {
  res.json({ user: req.user })
}