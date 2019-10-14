// @ts-check
const PLUGIN = "plugin-vuese"
const { join } = require('path')
const CustomContainerPlugin = require('@minipress/custom-container')
const { fromFile, renderer } = require('./api')
const { devalue } = require('@minipress/utils')
const MarkdownRenderer = require('@minipress/markdown')
const markdownRenderer = new MarkdownRenderer()
const fs = require('fs')

/**
 * @type {import('./types').Plugin}
 */
module.exports = {
  async apply(minipress, options) {
    minipress.hooks.registerGlobalComponents.tapPromise(PLUGIN, async () => {
      minipress.globalComponents.register('minipress-component-documentation-styles', join(__dirname, 'default-styles.vue'))
    })

    const _renderer = options.renderer === 'minipress-markdown' ? renderer.VueDocs : renderer.Vuese

    CustomContainerPlugin.apply(minipress, {
      type: 'component-documentation-for',
      defaultTitle: '',
      /** @param {{title: string}} options */
      renderBefore({ title }) {
        const componentPath = (() => {
          // First try to get the path by interpreting the title as a component name
          // that refers to a globally registered component
          const globalPath = minipress.components.getPath(title)
          if(globalPath != null) {
            return globalPath
          }
          // We end up here in case title is not known globally.
          // Now we try to resolve the path to something absolute
          const isRelativeToCwd = title.startsWith('@/')
          if(isRelativeToCwd) {
            return join(minipress.config.cwd, title.slice(2))
          }
          // We end up here in case the user hopefully is giving us a absolute path
          return title
        })()
        const parserResult = fromFile(componentPath)
        const markdownMarkup = _renderer(parserResult)
        const page = {}
        const { html } = markdownRenderer.render(markdownMarkup, { page })
        return `<div>${html}\n`
      },
      renderAfter() {
        return '</div>\n'
      }
    })

    minipress.hooks.registerComponents.tapPromise(PLUGIN, async () => {
      minipress.components.register('VueseComponentApi', join(__dirname, 'components', 'vuese-component-api.vue'))
    })

    minipress.hooks.vuePreloaders.tapPromise(PLUGIN, async preloaders => {
      preloaders.push({
        use: 'vuese-loader',
        loader: require.resolve('./vuese-loader'),
        options: {}
      })
    })
  },

  optionsSchema({ joi }) {
    const defaultRenderer = 'minipress-markdown'
    return joi.object({
      renderer: joi.string().allow('vuese-markdown', defaultRenderer).default(defaultRenderer)
    }).default({
      renderer: defaultRenderer
    })
  },
}
