import { serialize } from '../utils/serialize.js'

/**
 * `date` is a PostgreSQL `date` column, returned as "YYYY-MM-DD" by the type
 * parser in src/db/index.js. The admin table renders it directly
 * (`{{ r.date }}` in frontend/src/admin/views/ReservationsView.vue), so it must
 * not become a full ISO timestamp.
 */
export const Reservation = {
  table: 'reservations',

  serialize: (row) => serialize(row),
}

export default Reservation