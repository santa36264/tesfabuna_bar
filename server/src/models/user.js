import { serialize } from '../utils/serialize.js'

/** Bigint counts and numeric sums are already numbers thanks to src/db/index.js. */
export const count = async (table, query = (qb) => qb) => {
  const row = await query(table).count({ total: '*' }).first()
  return Number(row?.total ?? 0)
}

export const serializeUser = (row) => {
  if (!row) return row
  const { password, remember_token, ...rest } = serialize(row)
  return rest
}

export const User = {
  table: 'users',
  serialize: serializeUser,
}

export default User