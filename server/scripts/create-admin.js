/**
 * Interactive admin user creation.
 *
 *   npm run create-admin
 *
 * Credentials entered here are hashed with bcrypt, exactly like the Laravel
 * User model's `password` => `hashed` cast.
 */
import readline from 'node:readline/promises'
import bcrypt from 'bcryptjs'
import db from '../src/db/index.js'
import config from '../src/config/index.js'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const ask = async (question, fallback = '') => {
  const answer = (await rl.question(`${question}${fallback ? ` (${fallback})` : ''}: `)).trim()
  return answer || fallback
}

const run = async () => {
  const name = await ask('Name', 'Admin')
  const email = await ask('Email', 'admin@tesfabuna.com')
  const password = await ask('Password', 'Admin@12345')

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`"${email}" is not a valid email address.`)
  }

  const hash = await bcrypt.hash(password, config.auth.bcryptRounds)
  const existing = await db('users').where('email', email).first()

  if (existing) {
    await db('users').where('id', existing.id).update({ name, password: hash, updated_at: new Date() })
    console.log(`\n  Updated ${email}\n`)
  } else {
    await db('users').insert({ name, email, password: hash, role: 'admin' })
    console.log(`\n  Created ${email}\n`)
  }

  await db.destroy()
}

run()
  .catch(async (error) => {
    console.error(`\n  ${error.message}\n`)
    await db.destroy().catch(() => {})
    process.exit(1)
  })
  .finally(() => rl.close())