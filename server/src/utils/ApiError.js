/**
 * Error type that always serialises to the JSON shape Laravel returned:
 *   4xx/5xx -> { "message": "...", "errors": { "field": ["..."] } }
 */
export class ApiError extends Error {
  constructor(status, message, errors = undefined) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  static badRequest(message = 'Bad request.', errors) {
    return new ApiError(400, message, errors)
  }

  /** 422 - Laravel ValidationException. */
  static validation(errors, message = 'The given data was invalid.') {
    return new ApiError(422, message, errors)
  }

  /** 401 - Laravel "Unauthenticated." */
  static unauthenticated(message = 'Unauthenticated.') {
    return new ApiError(401, message)
  }

  /** 403 - mirrors AdminMiddleware. */
  static forbidden(message = 'Unauthorized. Admin access required.') {
    return new ApiError(403, message)
  }

  /** 404 - Laravel ModelNotFoundException. */
  static notFound(message = 'Resource not found.') {
    return new ApiError(404, message)
  }

  toJSON() {
    const body = { message: this.message }
    if (this.errors) body.errors = this.errors
    return body
  }
}

export default ApiError