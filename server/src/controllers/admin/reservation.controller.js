import db from '../../db/index.js'
import ApiError from '../../utils/ApiError.js'
import { Reservation, count } from '../../models/index.js'
import { serializeAll, compact } from '../../utils/serialize.js'

const findOrFail = async (id) => {
  const row = await db(Reservation.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${Reservation.table}] ${id}.`)
  return row
}

export const index = async (_req, res) => {
  const rows = await db(Reservation.table).orderBy('id', 'desc')
  res.json({ data: serializeAll(rows) })
}

export const show = async (req, res) => {
  res.json({ data: Reservation.serialize(await findOrFail(req.params.id)) })
}

export const update = async (req, res) => {
  const reservation = await findOrFail(req.params.id)

  const [updated] = await db(Reservation.table)
    .where('id', reservation.id)
    .update({ ...compact(req.body), updated_at: new Date() })
    .returning('*')

  res.json({ data: Reservation.serialize(updated) })
}

export const destroy = async (req, res) => {
  const reservation = await findOrFail(req.params.id)
  await db(Reservation.table).where('id', reservation.id).del()
  res.status(204).end()
}

export const stats = async (_req, res) => {
  const [total, pending, confirmed, cancelled] = await Promise.all([
    count(Reservation.table),
    count(Reservation.table, (q) => q.where('status', 'pending')),
    count(Reservation.table, (q) => q.where('status', 'confirmed')),
    count(Reservation.table, (q) => q.where('status', 'cancelled')),
  ])

  res.json({ total, pending, confirmed, cancelled })
}