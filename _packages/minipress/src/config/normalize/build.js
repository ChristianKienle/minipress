
// @ts-check
const { resolve } = require('path')

/** @typedef {import('@minipress/types').ConfigBuildConfig} BuildConfig */
/** @param {{ build?: BuildConfig, cwd: string}} options */
module.exports = ({ cwd, build = {} }) => {
  const {
    outDir = resolve(cwd, 'public'),
    base = '/'
  } = build
  return { outDir, base }
}
