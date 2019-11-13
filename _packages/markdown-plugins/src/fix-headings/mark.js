// @ts-check
/** @param {string} value */
const hasBeginMark = value => /<!--\s*fix-headings-begin\s*-->/.test(value.trim())

/** @param {string} value */
const hasEndMark = value => /<!--\s*fix-headings-end\s*-->/.test(value.trim())

module.exports = {
  hasBeginMark,
  hasEndMark
}
