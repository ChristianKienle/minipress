// @ts-check
const PLUGIN = "@minipress/plugin-component-documentation"
const { join } = require('path')
const CustomContainerPlugin = require('@minipress/custom-container')
const { renderer } = require('./api')
const { devalue, slugify } = require('@minipress/utils')
const MarkdownRenderer = require('@minipress/markdown')
const markdownRenderer = new MarkdownRenderer()
const fs = require('fs-extra')
const createComponentDocumentationForContainer = require('./containers/create-component-documentation-for-container')
markdownRenderer.init()
const ComponentsPlugin = require('@minipress/plugin-components')

/**
 * @type {import('./types').Plugin}
 */
module.exports = {
  async apply(minipress, options) {
    minipress.hooks.registerGlobalComponents.tapPromise(PLUGIN, async () => {
      minipress.globalComponents.register('minipress-component-documentation-styles', join(__dirname, 'default-styles.vue'))
    })

    const _renderer = options.renderer === 'minipress-markdown' ? renderer.VueDocs : renderer.Vuese

    const componentDocumentationForContainer = createComponentDocumentationForContainer(minipress, { markdownRenderer, renderer: _renderer })

    await CustomContainerPlugin.apply(minipress, componentDocumentationForContainer)

    minipress.hooks.vuePreloaders.tapPromise(PLUGIN, async preloaders => {
      preloaders.push({
        use: 'vuese-loader',
        loader: require.resolve('./vuese-loader'),
        options: {}
      })
    })
  },

  optionsSchema({ config, joi }) {
    const defaultRenderer = 'minipress-markdown'
    return joi.object({
      renderer: joi.string().allow('vuese-markdown', defaultRenderer).default(defaultRenderer)
    }).default({
      renderer: defaultRenderer
    })
  },
}
