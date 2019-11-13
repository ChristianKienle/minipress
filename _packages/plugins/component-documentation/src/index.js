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

    const _renderer = (() => {
      switch(options.renderer) {
        case 'markdown': {
          return renderer.Markdown
        }
        case 'minipress-markdown': {
          return renderer.Default
        }
        case 'vuese-markdown': {
          return renderer.Vuese
        }
      }
    })()

    const componentDocumentationForContainer = createComponentDocumentationForContainer(minipress, { markdownRenderer, renderer: _renderer })

    await CustomContainerPlugin.apply(minipress, componentDocumentationForContainer)
  },

  optionsSchema({ config, joi }) {
    const defaultRenderer = 'minipress-markdown'
    return joi.object({
      renderer: joi.string().allow('markdown', 'vuese-markdown', defaultRenderer).default(defaultRenderer)
    }).default({
      renderer: defaultRenderer
    })
  },
}
