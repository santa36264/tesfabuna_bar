/**
 * Row -> JSON normalisation shared by every controller.
 *
 * `db/index.js` already converts bigint/numeric to numbers. What is left is
 * turning PostgreSQL `timestamptz` Date objects into ISO strings, which is what
 * Eloquent's `created_at`/`updated_at` serialised to.
 */
export const serialize = (row) => {
  if (row === null || row === undefined) return row

  const output = {}
  for (const [key, value] of Object.entries(row)) {
    output[key] = value instanceof Date ? value.toISOString() : value
  }
  return output
}

export const serializeAll = (rows) => (rows ?? []).map(serialize)

/** Drops keys whose value is `undefined` so knex does not write them as NULL. */
export const compact = (object) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined))

export default serialize