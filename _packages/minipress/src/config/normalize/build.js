
// @ts-check
const { resolve } = require('path')
const Url = require('url')

/** @typedef {import('@minipress/types').ConfigBuildConfig} BuildConfig */
/** @typedef {Object.<string, any>} Pkg */


const DEFAULT_BASE = '/'

/**
 * @param {Pkg} pkg
 */
const baseFromPkg = pkg => {
  const { homepage } = pkg
  if(homepage == null) {
    return DEFAULT_BASE
  }
  if(typeof homepage !== 'string') {
    return DEFAULT_BASE
  }
  // no need for try/catch because Url.parse does not throw if we ensure
  // that homepage is a string – which we did.
  const { path } = Url.parse(homepage)
  if(path == null) {
    return DEFAULT_BASE
  }
  if(path.endsWith('/')) {
    return path
  }
  // We append / – because this is what we expect later on.
  return `${path}/`
}

/**
 * @typedef {object} Options
 * @prop {string} cwd
 * @prop {BuildConfig=} [build={}]
 * @prop {Pkg} [pkg={}]
 */

/**
 * @param {Options} options
 */
module.exports = ({
  cwd,
  build = {},
  pkg = {}
}) => {

  const base = (() => {
    const _base = build.base
    if(_base != null) {
      return _base
    }
    return baseFromPkg(pkg)
  })()

  const { outDir = resolve(cwd, 'public') } = build
  return { outDir, base }
}
