import { serialize } from '../utils/serialize.js'

export const Testimonial = {
  table: 'testimonials',
  serialize: (row) => serialize(row),
}

export default Testimonial