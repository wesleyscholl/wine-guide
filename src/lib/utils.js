/**
 * Normalize text by removing diacritical marks (accents) for search matching.
 * Converts characters like ô, é, ñ, ü to their base letters o, e, n, u.
 * @param {string} text - The text to normalize
 * @returns {string} - Normalized text with accents removed
 */
export function normalizeText(text) {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Check if a search query matches a target string (accent-insensitive)
 * @param {string} target - The text to search in
 * @param {string} query - The search query
 * @returns {boolean} - Whether the query matches
 */
export function matchesSearch(target, query) {
  if (!target || !query) return false;
  return normalizeText(target).includes(normalizeText(query));
}
