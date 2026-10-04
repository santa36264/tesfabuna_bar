import db from '../db/index.js'
import ApiError from '../utils/ApiError.js'
import { Drink } from '../models/index.js'
import { serializeAll, compact } from '../utils/serialize.js'

const findOrFail = async (id) => {
  const row = await db(Drink.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${Drink.table}] ${id}.`)
  return row
}

export const index = async (req, res) => {
  const query = Drink.available(db(Drink.table)).orderBy('sort_order')

  if (req.query.category) {
    Drink.byCategory(query, req.query.category)
  }

  res.json({ data: serializeAll(await query) })
}

export const show = async (req, res) => {
  res.json({ data: Drink.serialize(await findOrFail(req.params.id)) })
}

export const store = async (req, res) => {
  const [drink] = await db(Drink.table).insert(compact(req.body)).returning('*')
  res.status(201).json({ data: Drink.serialize(drink) })
}

export const update = async (req, res) => {
  const drink = await findOrFail(req.params.id)
  const payload = compact(req.body)

  const [updated] = await db(Drink.table)
    .where('id', drink.id)
    .update({ ...payload, updated_at: new Date() })
    .returning('*')

  res.json({ data: Drink.serialize(updated) })
}

export const destroy = async (req, res) => {
  const drink = await findOrFail(req.params.id)
  await db(Drink.table).where('id', drink.id).del()
  res.status(204).end()
}