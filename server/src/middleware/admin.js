import ApiError from '../utils/ApiError.js'

/** Port of App\Http\Middleware\AdminMiddleware. */
const admin = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(ApiError.forbidden())
  }
  return next()
}

export default admin