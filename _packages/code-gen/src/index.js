// @ts-check
const Code = require('./code')

/**
 * @typedef {import('./context')} Context
 * @typedef {import('./types').Lang} Lang
 * @typedef {(context: Context) => string[] | string} Generator
 */


const forLan =
  /** @param {Lang} lang */
  lang =>
  /** @param {Generator} generator */
  generator => new Code(generator, { lang }).gen()

module.exports = {
  html: forLan('html'),
  js: forLan('js'),
  vue: forLan('vue'),
  json: forLan('json'),
  raw: forLan('raw')
}
