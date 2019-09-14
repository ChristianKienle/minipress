// @ts-check
const prettier = require('prettier')

/**
 * @typedef {import('./types').Lang}  Lang
 * @typedef {import('prettier').BuiltInParserName} BuiltInParserName
 */
/**
 *
 * @param {Lang} lang
 * @return {BuiltInParserName}
 */
const langToParser = lang => {
  if(lang === 'js') {
    return 'babel'
  }
  if(lang === 'json') {
    return 'json'
  }
  if(lang === 'vue') {
    return 'vue'
  }
  if(lang === 'html') {
    return 'html'
  }
  return 'babel'
}

/**
 * @param {string} code
 * @param {Lang} [lang='js']
 */
module.exports = (code, lang = 'js') => {
  if (process.env.MINIPRESS_DISABLE_PRETTIER === 'true') {
    return code
  }
  if (process.env.NODE_ENV !== 'production' && lang !== 'raw') {
    return prettier.format(code, { parser: langToParser(lang) })
  }
  return code
}
