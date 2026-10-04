import validationError from './validationError.js'

/**
 * Validates `req[source]` and replaces it with the parsed value.
 *
 * Unknown keys are stripped rather than rejected, which is what Laravel's
 * `$request->validate()` did: only the declared rules were ever applied.
 */
export const validate = (schema, source = 'body') => (req, _res, next) => {
  const result = schema.safeParse(req[source])

  if (!result.success) {
    return next(validationError(result.error, req[source]))
  }

  req[source] = result.data
  return next()
}

export default validate