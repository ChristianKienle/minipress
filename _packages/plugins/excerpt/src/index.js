// @ts-check
const ExcerptPlugin = require('./markdown/excerpt-plugin')
const { join } = require('path')

const PLUGIN = '@minipress/plugin-excerpt'

const createExcerptPageKey = page => `Excerpt--${page.key}`

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress) {
    // Register Excerpt-Component
    minipress.hooks.registerComponents.tapPromise(PLUGIN, async components => {
      components.register('Excerpt', join(__dirname, 'components', '_excerpt.vue'))
    })

    // Install the excerpt-markdown plugin
    minipress.hooks.configureMarkdownRenderer.tapPromise(PLUGIN, async renderer => {
      renderer.use(ExcerptPlugin)
    })

    // For each page with an excerpt we create a virtual page with the excerpt
    minipress.hooks.onCreatePage.tapPromise(PLUGIN, async page => {
      if(page.excerpt == null) {
        return
      }
      await minipress.addPage({
        key: createExcerptPageKey(page),
        content: page.excerpt || '',
        contentType: 'md'
      })
    })
  }
}
