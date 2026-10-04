import db from '../../db/index.js'
import ApiError from '../../utils/ApiError.js'
import { ContactMessage } from '../../models/index.js'
import { serializeAll } from '../../utils/serialize.js'

const findOrFail = async (id) => {
  const row = await db(ContactMessage.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${ContactMessage.table}] ${id}.`)
  return row
}

export const index = async (_req, res) => {
  const rows = await db(ContactMessage.table).orderBy('id', 'desc')
  res.json({ data: serializeAll(rows) })
}

/** Opening a message marks it read, as it did in Laravel. */
export const show = async (req, res) => {
  const message = await findOrFail(req.params.id)

  const [updated] = await db(ContactMessage.table)
    .where('id', message.id)
    .update({ read: true, updated_at: new Date() })
    .returning('*')

  res.json({ data: ContactMessage.serialize(updated) })
}

export const destroy = async (req, res) => {
  const message = await findOrFail(req.params.id)
  await db(ContactMessage.table).where('id', message.id).del()
  res.status(204).end()
}