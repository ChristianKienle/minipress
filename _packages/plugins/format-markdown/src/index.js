// @ts-check
const ID = '@minipress/plugin-format-markdown'
const createTransformer = require('./transformer')
const Chain = require('@minipress/markdown-chain')
const Plugins = require('@minipress/markdown-plugins')

/**
 * @typedef {object} Options
 * @prop {string} test
*/

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress) {
    const transformer = createTransformer()

    minipress.hooks.afterPlugins.tapPromise(ID, async () => {
      const chain = new Chain()
      chain
        .plugin('fix-headings')
        .use(Plugins.FixHeadings)
        .end()
        .plugin('headings')
        .use(Plugins.Headings)
        .end()
        .plugin('highlight')
        .use(Plugins.Highlight)
        .end()
        .plugin('link')
        .use(Plugins.Link, [{
          externalAttrs: {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }])
        .end()
        .plugin('task-list')
        .use(Plugins.TaskList, [{
          disabled: false
        }])
      await minipress.hooks.chainMarkdown.promise(chain)
      transformer.renderer = chain.toMarkdown()
    })

    minipress.hooks.registerTransformers.tapPromise(ID, async () => {
      minipress.transformers.set('md', transformer)
    })
  }
}
