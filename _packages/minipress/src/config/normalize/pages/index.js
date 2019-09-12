// @ts-check
const pagesInDir = require('./get-pages-in-dir')

/**
 * @typedef {object} Options
 * @prop {string} cwd
 * @prop {string=} pages
 */

module.exports = ({ cwd, pages = null }) => {
  const dir = pages || cwd
  return pagesInDir(dir)
}
