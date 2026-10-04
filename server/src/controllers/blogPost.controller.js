import db from '../db/index.js'
import ApiError from '../utils/ApiError.js'
import { BlogPost } from '../models/index.js'
import { serializeAll, compact } from '../utils/serialize.js'
import slugify from '../utils/slugify.js'

const findOrFail = async (id) => {
  const row = await db(BlogPost.table).where('id', id).first()
  if (!row) throw ApiError.notFound(`No query results for model [${BlogPost.table}] ${id}.`)
  return row
}

export const index = async (req, res) => {
  const rows = await db(BlogPost.table)
    .where('published', true)
    .orderBy('published_at', 'desc')
  res.json({ data: serializeAll(rows) })
}

/**
 * Laravel looked the post up by `id` OR `slug`. On PostgreSQL a non-numeric
 * value in `where('id', 'art-of-kitfo')` raises 22P02 invalid input syntax, so
 * the id branch is only applied when the segment really is numeric.
 */
export const show = async (req, res) => {
  const identifier = req.params.id

  const row = /^\d+$/.test(identifier)
    ? await db(BlogPost.table).where('id', identifier).orWhere('slug', identifier).first()
    : await db(BlogPost.table).where('slug', identifier).first()

  if (!row) {
    throw ApiError.notFound(`No query results for model [${BlogPost.table}] ${identifier}.`)
  }

  res.json({ data: BlogPost.serialize(row) })
}

export const store = async (req, res) => {
  const payload = { ...compact(req.body), slug: slugify(req.body.title) }

  const [post] = await db(BlogPost.table).insert(payload).returning('*')
  res.status(201).json({ data: BlogPost.serialize(post) })
}

export const update = async (req, res) => {
  const post = await findOrFail(req.params.id)
  const payload = compact(req.body)

  if (req.body.title !== undefined) {
    payload.slug = slugify(req.body.title)
  }

  const [updated] = await db(BlogPost.table)
    .where('id', post.id)
    .update({ ...payload, updated_at: new Date() })
    .returning('*')

  res.json({ data: BlogPost.serialize(updated) })
}

export const destroy = async (req, res) => {
  const post = await findOrFail(req.params.id)
  await db(BlogPost.table).where('id', post.id).del()
  res.status(204).end()
}