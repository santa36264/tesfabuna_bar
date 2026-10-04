/**
 * Wraps an async route handler so rejected promises reach the Express error
 * handler (Express 4 does not do this on its own).
 */
export const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next)
}

export default asyncHandler