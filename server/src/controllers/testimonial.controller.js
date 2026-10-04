import db from '../db/index.js'
import ApiError from '../utils/ApiError.js'
import { Testimonial } from '../models/index.js'
import { serializeAll, compact } from '../utils/serialize.js'

const findOrFail = async (id) => {
  const row = await db(Testimonial.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${Testimonial.table}] ${id}.`)
  return row
}

export const index = async (req, res) => {
  const rows = await db(Testimonial.table).where('approved', true).orderBy('id', 'desc')
  res.json({ data: serializeAll(rows) })
}

export const store = async (req, res) => {
  const [testimonial] = await db(Testimonial.table).insert(compact(req.body)).returning('*')

  res.status(201).json({
    data: Testimonial.serialize(testimonial),
    message: 'Thank you for your review! It will appear after moderation.',
  })
}

export const show = async (req, res) => {
  res.json({ data: Testimonial.serialize(await findOrFail(req.params.id)) })
}

export const update = async (req, res) => {
  const testimonial = await findOrFail(req.params.id)

  const [updated] = await db(Testimonial.table)
    .where('id', testimonial.id)
    .update({ ...compact(req.body), updated_at: new Date() })
    .returning('*')

  res.json({ data: Testimonial.serialize(updated) })
}

export const destroy = async (req, res) => {
  const testimonial = await findOrFail(req.params.id)
  await db(Testimonial.table).where('id', testimonial.id).del()
  res.status(204).end()
}