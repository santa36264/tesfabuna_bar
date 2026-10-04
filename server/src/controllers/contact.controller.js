import db from '../db/index.js'
import { ContactMessage } from '../models/index.js'
import { compact } from '../utils/serialize.js'

export const send = async (req, res) => {
  await db(ContactMessage.table).insert(compact(req.body))

  res.json({
    message: "Your message has been received! We'll get back to you within 24 hours.",
  })
}