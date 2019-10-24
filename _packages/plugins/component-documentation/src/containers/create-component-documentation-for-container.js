// @ts-check
const { fromFile, renderer } = require('./../api')
const { join } = require('path')

/**
 * @typedef {object} Options
 * @prop {any} renderer
 * @prop {any} markdownRenderer
 */
/**
 * @param {any} minipress
 * @param {Options} options
 */
module.exports = (minipress, { markdownRenderer, renderer }) => ({
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
    const markdownMarkup = renderer(parserResult)
    const page = {}
    const { html } = markdownRenderer.render(markdownMarkup, { page })
    return `<div>${html}\n`
  },
  renderAfter() {
    return '</div>\n'
  }
})
