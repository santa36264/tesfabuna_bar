import db from '../../db/index.js'
import ApiError from '../../utils/ApiError.js'
import { MenuItem } from '../../models/index.js'
import { serializeAll, compact } from '../../utils/serialize.js'

const findOrFail = async (id) => {
  const row = await db(MenuItem.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${MenuItem.table}] ${id}.`)
  return row
}

export const index = async (_req, res) => {
  const rows = await db(MenuItem.table).orderBy('sort_order')
  res.json({ data: serializeAll(rows) })
}

export const store = async (req, res) => {
  const [item] = await db(MenuItem.table).insert(compact(req.body)).returning('*')
  res.status(201).json({ data: MenuItem.serialize(item) })
}

export const show = async (req, res) => {
  res.json({ data: MenuItem.serialize(await findOrFail(req.params.id)) })
}

export const update = async (req, res) => {
  const item = await findOrFail(req.params.id)

  const [updated] = await db(MenuItem.table)
    .where('id', item.id)
    .update({ ...compact(req.body), updated_at: new Date() })
    .returning('*')

  res.json({ data: MenuItem.serialize(updated) })
}

export const destroy = async (req, res) => {
  const item = await findOrFail(req.params.id)
  await db(MenuItem.table).where('id', item.id).del()
  res.status(204).end()
}