// @ts-check
const fs = require('fs')

/**
 * @param {string} file
 * @returns {string}
 */
const readFileSync = file => fs.readFileSync(file, 'utf-8')

module.exports = {
  /** @param {string} file */
  readJson: (file, readFile = readFileSync) => JSON.parse(readFile(file)),
  /**
   *
   * @param {string} string
   * @param {string} prefix
   * @param {string} [replacement='']
   */
  replacePrefix(string, prefix, replacement = '') {
    if (string.startsWith(prefix)) {
      return string.replace(prefix, replacement)
    }
    return string
  }
}

