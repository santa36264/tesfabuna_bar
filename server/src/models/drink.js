import { serialize } from '../utils/serialize.js'

export const Drink = {
  table: 'drinks',

  available(query) {
    return query.where('available', true)
  },

  byCategory(query, category) {
    return category ? query.where('category', category) : query
  },

  serialize: (row) => serialize(row),
}

export default Drink