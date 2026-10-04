/**
 * Turns a ZodError into Laravel's `{ field: [message] }` bag so the Vue admin
 * can read `err.response.data.errors.email[0]` exactly as it did before.
 *
 * Zod 4 does not expose which input produced an `invalid_type` issue, so the
 * original payload is passed alongside the error: a key that is absent (or
 * null/blank) means Laravel's `required` rule failed, while a key that is
 * present but of the wrong shape means the type rule failed.
 */
import { ZodError } from 'zod'
import ApiError from './ApiError.js'
import * as messages from './messages.js'

const isMissing = (input, field) => {
  if (!input || typeof input !== 'object' || !(field in input)) return true
  const value = input[field]
  return value === undefined || value === null || value === ''
}

const messageFor = (issue, path, input) => {
  const field = path[0]

  // Custom refinements carry their own Laravel-flavoured message.
  if (issue.code === 'custom' && issue.message) return issue.message

  switch (issue.code) {
    case 'invalid_type':
      if (isMissing(input, field)) return messages.required(field)
      if (issue.expected === 'number') return messages.mustBeNumber(field)
      if (issue.expected === 'integer') return messages.mustBeInteger(field)
      if (issue.expected === 'boolean') return messages.mustBeBoolean(field)
      if (issue.expected === 'date') return messages.validDate(field)
      return messages.required(field)

    case 'invalid_format':
      if (isMissing(input, field)) return messages.required(field)
      if (issue.format === 'email') return messages.validEmail(field)
      return messages.validDate(field)

    // Zod 3 called this invalid_enum_value, Zod 4 calls it invalid_value.
    case 'invalid_enum_value':
    case 'invalid_value':
      if (isMissing(input, field)) return messages.required(field)
      return Array.isArray(issue.values)
        ? messages.invalidSelection(field)
        : messages.required(field)

    case 'too_big':
      if (issue.type === 'string' || issue.origin === 'string') {
        return messages.stringMax(field, issue.maximum)
      }
      return messages.maxValue(field, issue.maximum)

    case 'too_small':
      if ((issue.type === 'string' || issue.origin === 'string') && issue.minimum === 1) {
        return messages.required(field)
      }
      return messages.minValue(field, issue.minimum)

    default:
      return issue.message || messages.required(field)
  }
}

/**
 * Collects issues keyed by their field name.
 * Nested paths are joined with "." so nothing is silently dropped.
 */
export const toErrorBag = (error, input) => {
  if (!(error instanceof ZodError)) return {}

  return error.issues.reduce((bag, issue) => {
    const path = issue.path.length ? issue.path : ['value']
    const key = path.join('.')
    const message = messageFor(issue, path, input)

    if (!bag[key]) bag[key] = []
    if (!bag[key].includes(message)) bag[key].push(message)

    return bag
  }, {})
}

export const validationError = (error, input) => ApiError.validation(toErrorBag(error, input))

export default validationError