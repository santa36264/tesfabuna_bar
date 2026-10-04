import db from '../db/index.js'
import { NewsletterSubscriber } from '../models/index.js'

export const subscribe = async (req, res) => {
  const { email } = req.body

  // firstOrCreate(['email' => ...], ['active' => true])
  const existing = await db(NewsletterSubscriber.table).where('email', email).first()

  if (!existing) {
    await db(NewsletterSubscriber.table).insert({ email, active: true })
  }

  res.json({
    message: "Thank you for subscribing! You'll receive our latest updates.",
  })
}