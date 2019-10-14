// @ts-check
const { join } = require('path')
const PLUGIN = "summary-container"
const createCustomContainer = require('@minipress/custom-container')

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress) {
    minipress.hooks.registerGlobalComponents.tapPromise(PLUGIN, async () => {
      minipress.globalComponents.register('sc-styles', join(__dirname, 'styles.vue'))
    })

    minipress.hooks.registerComponents.tapPromise(PLUGIN, async () => {
      minipress.components.register('ScDetails', join(__dirname, 'details.vue'))
      minipress.components.register('ScDetailsContent', join(__dirname, 'details-content.vue'))
      minipress.components.register('ScSummary', join(__dirname, 'summary.vue'))
    })

    // plugin implementation goes here
    createCustomContainer.apply(minipress, {
      type: 'summary',
      renderBefore: ({ title }) => {
        return `<ScDetails><ScSummary>${title}</ScSummary><ScDetailsContent>\n`
        return `<div class="sc-container"><details class="sc-container__details"><summary class="sc-container__summary">${title}</summary><div class="sc-container__body">\n`
      },
      renderAfter: () => '\n</ScDetailsContent></ScDetails>',
      defaultTitle: 'more…'
    })
  }
}
