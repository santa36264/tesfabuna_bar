import { serialize } from '../utils/serialize.js'

export const MenuItem = {
  table: 'menu_items',

  /** scopeAvailable() */
  available(query) {
    return query.where('available', true)
  },

  /** scopeByCategory() */
  byCategory(query, category) {
    return category ? query.where('category', category) : query
  },

  serialize: (row) => serialize(row),
}

export default MenuItem