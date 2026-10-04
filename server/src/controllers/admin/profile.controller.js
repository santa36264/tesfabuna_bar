import bcrypt from 'bcryptjs'
import db from '../../db/index.js'
import config from '../../config/index.js'
import ApiError from '../../utils/ApiError.js'
import { revokeOtherTokens } from '../auth.controller.js'
import { compact } from '../../utils/serialize.js'

export const show = async (req, res) => {
  res.json({ user: req.user })
}

export const update = async (req, res) => {
  const payload = compact(req.body)

  if (payload.email) {
    const taken = await db('users').where('email', payload.email).whereNot('id', req.user.id).first()

    if (taken) {
      throw ApiError.validation({ email: ['The email has already been taken.'] })
    }
  }

  const [user] = await db('users')
    .where('id', req.user.id)
    .update({ ...payload, updated_at: new Date() })
    .returning('*')

  const { password, remember_token, ...safe } = user

  res.json({
    message: 'Profile updated successfully.',
    user: safe,
  })
}

export const changePassword = async (req, res) => {
  const { current_password, password } = req.body

  // Compare against the raw row: `req.user` has the password hash stripped.
  const matches = await bcrypt.compare(current_password, req.userRecord.password)
  if (!matches) {
    throw ApiError.validation({
      current_password: ['The current password is incorrect.'],
    })
  }

  await db('users')
    .where('id', req.user.id)
    .update({
      password: await bcrypt.hash(password, config.auth.bcryptRounds),
      updated_at: new Date(),
    })

  // Force other devices to log in again.
  await revokeOtherTokens(req.user.id, req.accessToken.id)

  res.json({ message: 'Password changed successfully.' })
}