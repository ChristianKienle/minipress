// @ts-check
const prettier = require('prettier')

const prettify = code => prettier.format(code, { parser: 'babel' })

/** @param {string} code */
module.exports = code => {
  if (process.env.NODE_ENV !== 'production') {
    return prettify(code)
  }
  return code
}
