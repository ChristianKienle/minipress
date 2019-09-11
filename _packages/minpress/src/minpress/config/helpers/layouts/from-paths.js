// @ts-check
const { parse } = require('path')

/** @param {string} path */
const isSFC = path => parse(path).ext === '.vue'

/** @param {string[]} paths */
module.exports = paths => {
  const sfcPaths = paths.filter(isSFC)
  /** @type {{[layoutName: string]: string}}  */
  const result = {}
  sfcPaths.forEach(path => {
    const name = parse(path).name
    result[name] = path
  })
  return result
}
