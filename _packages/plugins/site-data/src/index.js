// @ts-check
const PLUGIN = '@minipress/plugin-site-data'
module.exports = {
  /** @type {import('./../../plugin').Plugin} */
  async apply(minipress, options) {
    minipress.hooks.getSiteData.tapPromise(PLUGIN, async () => {
      if (typeof options === 'object') {
        minipress.siteData = {
          ...minipress.siteData,
          ...options
        }
      }
    })
  }
}
