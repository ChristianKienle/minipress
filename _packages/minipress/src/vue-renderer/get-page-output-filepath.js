// @ts-check
const { join } = require('path')

/**
 * @typedef {import('@minipress/types').EmittablePage} EmittablePage
 */
/**
 * @param {EmittablePage} page
 * @param {{ outDir: string }} options
 */
module.exports = (page, { outDir }) => {
  const { permalink, path } = page
  const _path = permalink || path
  if(_path == null) {
    return
  }
  const isOkay = _path.endsWith('.html')
  if(isOkay) {
    return join(outDir, _path)
  }
  const repaired = _path.replace(/\/?$/, '/index.html')
  return join(outDir, repaired)
}
