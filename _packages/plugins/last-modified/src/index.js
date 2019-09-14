// @ts-check
const fs = require('fs-extra')

/** @type {import('./../../plugin').Plugin} */
module.exports = {
  apply(minipress) {
    minipress.pageTransformers.add(async page => {
      if (page._filePath != null) {
        const stats = await fs.stat(page._filePath)
        page.properties.lastModified = stats.mtime.toISOString()
      }
    })
  }
}
