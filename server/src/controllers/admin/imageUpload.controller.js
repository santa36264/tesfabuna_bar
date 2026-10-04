import ApiError from '../../utils/ApiError.js'
import * as messages from '../../utils/messages.js'
import { detectImage } from '../../utils/imageType.js'
import { randomFilename } from '../../utils/token.js'
import { saveBuffer, deleteFile, publicUrl, ensureUploadDir } from '../../utils/storage.js'

const fileTypeList = ['jpeg', 'png', 'jpg', 'gif', 'webp']

/**
 * Replaces Laravel's `'image' => 'image|mimes:...|max:5120'` + `store()`.
 *
 * The extension is derived from the file's magic bytes rather than the
 * client-supplied mimetype, so a renamed .php or .svg cannot be written.
 */
export const upload = async (req, res) => {
  if (!req.file) {
    throw ApiError.validation({ image: [messages.required('image')] })
  }

  const detected = detectImage(req.file.buffer)

  if (!detected) {
    throw ApiError.validation({ image: [messages.mustBeImage('image')] })
  }

  if (!fileTypeList.includes(detected.ext) && detected.ext !== 'jpg') {
    throw ApiError.validation({ image: [messages.mustBeFileType('image', fileTypeList)] })
  }

  const filename = randomFilename(detected.ext)
  await ensureUploadDir()
  await saveBuffer(req.file.buffer, filename)

  res.status(201).json({
    url: publicUrl(filename),
    path: filename,
    size: req.file.size,
    mime: detected.mime,
  })
}

export const remove = async (req, res) => {
  const { path: relativePath } = req.body

  // Laravel accepted "uploads/<file>"; accept a bare filename too.
  const normalised = String(relativePath).replace(/^uploads[\\/]/, '')
  await deleteFile(normalised)

  res.json({ message: 'Image deleted.' })
}

export default { upload, remove }