// @ts-check
const PLUGIN = "@minipress/plugin-component-demo"
const { join, parse, format } = require('path')
const { globby, camelize, pathToComponentName } = require('@minipress/utils')
const fs = require('fs-extra')

/**
 * @type {import('./types').Plugin}
 */
module.exports = {
  async apply(minipress, options) {
    // Register all Stories as global components
    minipress.hooks.registerComponents.tapPromise(PLUGIN, async () => {
      minipress.components.register('Story', join(__dirname, 'components', 'story.vue'))
      minipress.components.register('Demo', join(__dirname, 'components', 'demo.vue'))
      minipress.components.register('StorySrc', join(__dirname, 'components', 'story-src.vue'))
      const files = await globby('**/*.vue', { cwd: options.dir })
      files.forEach(file => {
        const name = `Story-${pathToComponentName(file.relative)}`
        minipress.components.register(name, file.absolute)
      })
    })

    // Add a page that renders the source of each story
    minipress.hooks.emitPages.tapPromise(PLUGIN, async () => {
      const files = await globby('**/*.vue', { cwd: options.dir })
      // Let's use for…of here in order to now overwhelm the CPU
      for(const file of files) {
        const source = await fs.readFile(file.absolute, 'utf-8')
        const key = `StorySrc-${pathToComponentName(file.relative)}`
        let content = ''
        content += '``` markup\n'
        content += source
        content += '\n```'
        await minipress.addPage({
          content,
          key,
          contentType: 'md'
        })
      }
    })
  },

  optionsSchema({ config, joi }) {
    const defaultDir = join(config.cwd, 'demos')
    return joi.object({
      dir: joi.string().default(defaultDir)
    }).default({ dir: defaultDir })
  }
}
