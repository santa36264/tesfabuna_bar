import db from '../db/index.js'
import ApiError from '../utils/ApiError.js'
import { Reservation } from '../models/index.js'
import { serializeAll, compact } from '../utils/serialize.js'

const findOrFail = async (id) => {
  const row = await db(Reservation.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${Reservation.table}] ${id}.`)
  return row
}

export const index = async (req, res) => {
  const rows = await db(Reservation.table).orderBy('date').orderBy('time')
  res.json({ data: serializeAll(rows) })
}

export const store = async (req, res) => {
  const [reservation] = await db(Reservation.table)
    .insert({ ...compact(req.body), status: 'pending' })
    .returning('*')

  res.status(201).json({
    data: Reservation.serialize(reservation),
    message: 'Reservation confirmed! We look forward to seeing you.',
  })
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