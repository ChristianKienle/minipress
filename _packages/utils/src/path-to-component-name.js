// @ts-check

// It is a pretty common thing that we have some kind of path (relative or absolute) to a SFC and we want to register that component. The name should be inferred just from looking at the path.

const { normalize, parse, format } = require('path')
const camelize = require('./camelize')

/**
 * @typedef {object} Options
 * @prop {string=} prefix
 * @prop {string=} suffix
 */
/**
 * @param {string} path
 * @returns {string}
 */
module.exports = path => {
  const { dir, name } = parse(path)
  return format({ name, dir }).split(/\/|\\/g).map(camelize).join('-')
}
