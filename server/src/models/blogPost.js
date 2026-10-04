import { serialize } from '../utils/serialize.js'

export const BlogPost = {
  table: 'blog_posts',
  serialize: (row) => serialize(row),
}

export default BlogPost