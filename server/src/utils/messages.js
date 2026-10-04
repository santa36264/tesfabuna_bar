/**
 * Validation messages that mirror Laravel's default wording.
 *
 * The Vue admin reads `response.data.errors.<field>[0]`
 * (see frontend/src/admin/components/ImageUploader.vue and
 * frontend/src/admin/stores/auth.js), so the shape *and* the phrasing of these
 * messages are part of the API contract.
 */
const label = (field) => String(field).replace(/_/g, ' ')

export const required = (field) => `The ${label(field)} field is required.`

export const stringMax = (field, max) =>
  `The ${label(field)} field must not be greater than ${max} characters.`

export const minValue = (field, min) => `The ${label(field)} field must be at least ${min}.`

export const maxValue = (field, max) => `The ${label(field)} field must not be greater than ${max}.`

export const mustBeNumber = (field) => `The ${label(field)} field must be a number.`

export const mustBeInteger = (field) => `The ${label(field)} field must be an integer.`

export const mustBeBoolean = (field) => `The ${label(field)} field must be true or false.`

export const validEmail = (field) => `The ${label(field)} field must be a valid email address.`

export const emailMax = (field, max) =>
  `The ${label(field)} field must not be greater than ${max} characters.`

export const invalidSelection = (field) => `The selected ${label(field)} is invalid.`

export const validDate = (field) => `The ${label(field)} field must be a valid date.`

export const afterOrEqualToday = (field) =>
  `The ${label(field)} field must be a date after or equal to today.`

export const alreadyTaken = (field) => `The ${label(field)} has already been taken.`

export const notConfirmed = (field) => `The ${label(field)} field confirmation does not match.`

export const mustBeImage = (field) => `The ${label(field)} field must be an image.`

export const mustBeFileType = (field, types) =>
  `The ${label(field)} field must be a file of type: ${types.join(', ')}.`

export const maxFileSize = (field, kilobytes) =>
  `The ${label(field)} field must not be greater than ${kilobytes} kilobytes.`

export default {
  label,
  required,
  stringMax,
  minValue,
  maxValue,
  mustBeNumber,
  mustBeInteger,
  mustBeBoolean,
  validEmail,
  emailMax,
  invalidSelection,
  validDate,
  afterOrEqualToday,
  alreadyTaken,
  notConfirmed,
  mustBeImage,
  mustBeFileType,
  maxFileSize,
}