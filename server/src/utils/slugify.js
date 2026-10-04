/**
 * Port of Illuminate\Support\Str::slug().
 *
 * Accents are folded, the string is lowercased and every run of non
 * alphanumeric characters collapses into a single separator.
 */
export const slugify = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[øØæÆ]/g, (char) => ({ ø: 'o', Ø: 'o', æ: 'ae', Æ: 'ae' })[char])
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export default slugify