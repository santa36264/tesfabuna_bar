import multer from 'multer'
import config from '../config/index.js'
import ApiError from '../utils/ApiError.js'
import * as messages from '../utils/messages.js'

const allowedMimeTypes = new Set(config.uploads.mimeTypes)
const fileTypeList = ['jpeg', 'png', 'jpg', 'gif', 'webp']

/**
 * Laravel's `'image' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120'`.
 *
 * multer handles the size ceiling, the real content check happens in the
 * controller via magic-byte sniffing, and the field name stays `image` so the
 * error bag comes back as `errors.image[0]`.
 */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.uploads.maxSizeKb * 1024,
    files: 1,
  },
  fileFilter(_req, file, cb) {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(ApiError.validation({ image: [messages.mustBeFileType('image', fileTypeList)] }))
    }
    return cb(null, true)
  },
})

/** Single "image" field. Errors are re-shaped to Laravel's format. */
export const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, (error) => {
    if (!error) return next()

    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return next(
          ApiError.validation({
            image: [messages.maxFileSize('image', config.uploads.maxSizeKb)],
          }),
        )
      }
      return next(
        ApiError.validation({ image: [messages.mustBeImage('image')] }),
      )
    }

    return next(error)
  })
}

export default uploadImage