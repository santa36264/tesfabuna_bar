import db from '../db/index.js'
import ApiError from '../utils/ApiError.js'
import { GalleryImage } from '../models/index.js'
import { serializeAll, compact } from '../utils/serialize.js'

const findOrFail = async (id) => {
  const row = await db(GalleryImage.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${GalleryImage.table}] ${id}.`)
  return row
}

export const index = async (req, res) => {
  const query = db(GalleryImage.table).where('active', true).orderBy('sort_order')

  if (req.query.category) {
    query.where('category', req.query.category)
  }

  res.json({ data: serializeAll(await query) })
}

export const store = async (req, res) => {
  const [image] = await db(GalleryImage.table).insert(compact(req.body)).returning('*')
  res.status(201).json({ data: GalleryImage.serialize(image) })
}

export const show = async (req, res) => {
  res.json({ data: GalleryImage.serialize(await findOrFail(req.params.id)) })
}

export const destroy = async (req, res) => {
  const image = await findOrFail(req.params.id)
  await db(GalleryImage.table).where('id', image.id).del()
  res.status(204).end()
}