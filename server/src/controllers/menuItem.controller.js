import db from '../db/index.js'
import ApiError from '../utils/ApiError.js'
import { MenuItem } from '../models/index.js'
import { serializeAll, compact } from '../utils/serialize.js'

const findOrFail = async (id) => {
  const row = await db(MenuItem.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${MenuItem.table}] ${id}.`)
  return row
}

export const index = async (req, res) => {
  const query = MenuItem.available(db(MenuItem.table)).orderBy('sort_order')

  if (req.query.category) {
    MenuItem.byCategory(query, req.query.category)
  }

  if (req.query.q) {
    const term = `%${req.query.q}%`
    // `ilike` because PostgreSQL's `like` is case sensitive (SQLite's was not).
    query.where((nested) => {
      nested.whereILike('name', term).orWhereILike('description', term)
    })
  }

  res.json({ data: serializeAll(await query) })
}

export const show = async (req, res) => {
  res.json({ data: MenuItem.serialize(await findOrFail(req.params.id)) })
}

export const store = async (req, res) => {
  const [item] = await db(MenuItem.table).insert(compact(req.body)).returning('*')
  res.status(201).json({ data: MenuItem.serialize(item) })
}

export const update = async (req, res) => {
  const item = await findOrFail(req.params.id)
  const payload = compact(req.body)

  const [updated] = await db(MenuItem.table)
    .where('id', item.id)
    .update({ ...payload, updated_at: new Date() })
    .returning('*')

  res.json({ data: MenuItem.serialize(updated) })
}

export const destroy = async (req, res) => {
  const item = await findOrFail(req.params.id)
  await db(MenuItem.table).where('id', item.id).del()
  res.status(204).end()
}