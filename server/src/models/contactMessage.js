import { serialize } from '../utils/serialize.js'

export const ContactMessage = {
  table: 'contact_messages',
  serialize: (row) => serialize(row),
}

export default ContactMessage