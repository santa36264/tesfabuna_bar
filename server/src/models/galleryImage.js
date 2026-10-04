import { serialize } from '../utils/serialize.js'

export const GalleryImage = {
  table: 'gallery_images',
  serialize: (row) => serialize(row),
}

export default GalleryImage