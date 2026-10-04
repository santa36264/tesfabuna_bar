import crypto from 'node:crypto'

/**
 * Opaque API tokens, stored the way Laravel Sanctum stored them: a random
 * plaintext token is handed to the client once, while the database only ever
 * holds its SHA-256 digest.
 */
export const generateToken = () => crypto.randomBytes(32).toString('hex')

export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex')

export const randomFilename = (extension) =>
  crypto.randomBytes(20).toString('hex') + (extension ? `.${extension}` : '')

export default { generateToken, hashToken, randomFilename }