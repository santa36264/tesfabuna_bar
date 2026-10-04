import fs from 'node:fs/promises'
import path from 'node:path'
import config from '../config/index.js'

/**
 * Local disk storage, the counterpart of Laravel's `Storage::disk('public')`
 * rooted at `storage/app/public` and exposed through the `/storage` symlink.
 *
 * Paths are stored relative to the upload root (e.g. `uploads/abc.png` in
 * Laravel, `abc.png` here) and the public URL is built from APP_URL.
 */
export const uploadDir = () => config.uploads.dir

export const ensureUploadDir = async () => {
  await fs.mkdir(config.uploads.dir, { recursive: true })
  return config.uploads.dir
}

/** Resolves a stored relative path, refusing anything that escapes the root. */
export const resolveUploadPath = (relativePath) => {
  const target = path.resolve(config.uploads.dir, relativePath)
  const root = path.resolve(config.uploads.dir)
  if (target !== root && !target.startsWith(root + path.sep)) return null
  return target
}

export const saveBuffer = async (buffer, filename) => {
  await ensureUploadDir()
  const target = path.join(config.uploads.dir, filename)
  await fs.writeFile(target, buffer)
  return filename
}

export const deleteFile = async (relativePath) => {
  if (!relativePath) return false
  const target = resolveUploadPath(relativePath)
  if (!target) return false

  try {
    await fs.unlink(target)
    return true
  } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
}

export const publicUrl = (filename) => `${config.app.url}${config.uploads.urlPrefix}/${filename}`

export default { ensureUploadDir, saveBuffer, deleteFile, publicUrl, uploadDir, resolveUploadPath }