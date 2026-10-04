import db from '../../db/index.js'
import ApiError from '../../utils/ApiError.js'
import { GalleryImage } from '../../models/index.js'
import { serializeAll, compact } from '../../utils/serialize.js'
import { deleteFile } from '../../utils/storage.js'

const findOrFail = async (id) => {
  const row = await db(GalleryImage.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${GalleryImage.table}] ${id}.`)
  return row
}

export const index = async (_req, res) => {
  const rows = await db(GalleryImage.table).orderBy('sort_order')
  res.json({ data: serializeAll(rows) })
}

export const store = async (req, res) => {
  const [image] = await db(GalleryImage.table).insert(compact(req.body)).returning('*')
  res.status(201).json({ data: GalleryImage.serialize(image) })
}

export const show = async (req, res) => {
  res.json({ data: GalleryImage.serialize(await findOrFail(req.params.id)) })
}

export const update = async (req, res) => {
  const image = await findOrFail(req.params.id)

  const [updated] = await db(GalleryImage.table)
    .where('id', image.id)
    .update({ ...compact(req.body), updated_at: new Date() })
    .returning('*')

  res.json({ data: GalleryImage.serialize(updated) })
}

export const destroy = async (req, res) => {
  const image = await findOrFail(req.params.id)

  // Drop the stored file when this row points at a local upload.
  if (image.path) {
    await deleteFile(String(image.path).replace(/^uploads[\\/]/, ''))
  }

  await db(GalleryImage.table).where('id', image.id).del()
  res.status(204).end()
}