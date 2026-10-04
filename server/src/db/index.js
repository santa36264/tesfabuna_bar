import knex from 'knex'
import pg from 'pg'
import config from '../config/index.js'

/*
|--------------------------------------------------------------------------
| PostgreSQL type parsers
|--------------------------------------------------------------------------
| node-postgres returns `bigint` and `numeric` columns as strings to avoid
| precision loss. Every `id` here is a `serial` (int4, already a number) but
| counts and sums come back as bigint, and `price` is `numeric`. The Laravel
| app returned these as JSON numbers, so normalise them here once instead of
| casting in every controller.
|
| `date` (no time component) is returned untouched so `reservations.date`
| serialises as "YYYY-MM-DD" instead of a full ISO timestamp.
*/
pg.types.setTypeParser(pg.types.builtins.INT8, (value) => (value === null ? null : Number(value)))
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => (value === null ? null : Number(value)))
pg.types.setTypeParser(pg.types.builtins.DATE, (value) => value)

export const db = knex({
  client: config.db.client,
  connection: config.db.connection,
  pool: config.db.pool,
})

export default db