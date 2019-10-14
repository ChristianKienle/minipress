// @ts-check
const { join } = require('path')

/** @type {import('./../plugin').Plugin} */
module.exports = {
  async apply(minipress) {
    minipress.hooks.registerLayouts.tapPromise('@minipress/theme-default', async () => {
      minipress.layouts.register('default', join(__dirname, 'src', 'layouts', 'default.vue'))
    })
  }
}
