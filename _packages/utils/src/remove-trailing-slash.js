/**
 * Removes the last '/' from a given string. However it does not remove anything
 * if the provded string is just '/' (a single slash)
 * @param {string} input
 * @returns {string}
 */
module.exports = input => {
  if (input.length === 0) {
    return input
  }
  if (input === '/') {
    return input
  }
  if (input.endsWith('/')) {
    return input.substring(0, input.length - 1)
  }
  return input
}
