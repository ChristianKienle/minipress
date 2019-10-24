// @ts-check
const { parse, format } = require('path')
const { camelize } = require('@minipress/utils')

/** @param {import('./types').ComponentNameContext} context */
module.exports = ({ path }) => {
  const { relative } = path
  if (relative == null) {
    throw Error('Error')
  }
  const parsed = parse(relative)
  const formatted = format({
    dir: parsed.dir,
    name: parsed.name
  })
  const components = formatted.split(/\/|\\/g).map(camelize)
  return components.join('-')
}
