import bcrypt from 'bcryptjs'
import config from '../../config/index.js'

export async function seed(knex) {
  const email = 'admin@tesfabunna.com'
  const password = 'Admin@12345'

  const existing = await knex('users').where('email', email).first()

  if (existing) {
    await knex('users').where('id', existing.id).update({
      name: 'TesfaBunna Admin',
      role: 'admin',
      updated_at: new Date(),
    })
  } else {
    await knex('users').insert({
      name: 'TesfaBunna Admin',
      email,
      password: await bcrypt.hash(password, config.auth.bcryptRounds),
      role: 'admin',
    })
  }

  console.log(`  admin: ${email} / ${password}`)
}