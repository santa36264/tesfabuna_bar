import { serialize } from '../utils/serialize.js'

export const NewsletterSubscriber = {
  table: 'newsletter_subscribers',
  serialize: (row) => serialize(row),
}

export default NewsletterSubscriber