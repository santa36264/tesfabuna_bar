import ApiError from '../../utils/ApiError.js'
import * as messages from '../../utils/messages.js'
import { detectImage } from '../../utils/imageType.js'
import cloudinary from '../../config/cloudinary.js'

const fileTypeList = ['jpeg', 'png', 'jpg', 'gif', 'webp']

/**
 * Upload image to Cloudinary (works on Vercel serverless)
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

  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_URL && !process.env.CLOUDINARY_CLOUD_NAME) {
    throw ApiError.serverError('Cloudinary not configured. Please set CLOUDINARY_URL environment variable.')
  }

  try {
    // Upload to Cloudinary using buffer
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'tesfabunna',
          resource_type: 'image',
          allowed_formats: fileTypeList,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(req.file.buffer)
    })

    res.status(201).json({
      url: result.secure_url,
      path: result.public_id,
      size: req.file.size,
      mime: detected.mime,
    })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw ApiError.serverError('Failed to upload image to cloud storage.')
  }
}

export const remove = async (req, res) => {
  const { path: publicId } = req.body

  if (!publicId) {
    throw ApiError.validation({ path: ['Path is required'] })
  }

  try {
    await cloudinary.uploader.destroy(publicId)
    res.json({ message: 'Image deleted.' })
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw ApiError.serverError('Failed to delete image from cloud storage.')
  }
}

export default { upload, remove }
