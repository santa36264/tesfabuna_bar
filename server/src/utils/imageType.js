/**
 * Magic-byte image detection.
 *
 * The browser supplied `type` on a multipart upload is attacker controlled, so
 * the extension is derived from the file contents instead. This replaces
 * Laravel's `image` + `mimes:` validation rules.
 */
const SIGNATURES = [
  { ext: 'jpg', mime: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { ext: 'png', mime: 'image/png', bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { ext: 'gif', mime: 'image/gif', bytes: [0x47, 0x49, 0x46, 0x38] },
]

const startsWith = (buffer, bytes) => bytes.every((byte, index) => buffer[index] === byte)

/** Returns `{ ext, mime }` or null when the buffer is not a supported image. */
export const detectImage = (buffer) => {
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) return null

  for (const signature of SIGNATURES) {
    if (startsWith(buffer, signature.bytes)) {
      return { ext: signature.ext, mime: signature.mime }
    }
  }

  // RIFF....WEBP
  const isRiff = startsWith(buffer, [0x52, 0x49, 0x46, 0x46])
  const isWebp = buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  if (isRiff && isWebp) return { ext: 'webp', mime: 'image/webp' }

  return null
}

export default detectImage