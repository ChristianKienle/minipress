// @ts-check
const Plugin = require('./plugin')
const Markdown = require('@minipress/markdown')

module.exports = class Chain {
  constructor() {
    this._plugins = /** @type {Map.<string, Plugin>} */ (new Map())
  }
  /**
   * @param {string} name
   * @returns {Plugin}
   */
  plugin(name) {
    const plugin = this._plugins.get(name) || new Plugin(this, name)
    this._plugins.set(name, plugin)
    return plugin
  }

  /** @returns {string[]} */
  orderedPluginNames() {
    const names = Array.from(this._plugins.keys())
    const ordered = [...names]
    const plugins = Array.from(this._plugins.values())
    plugins.forEach(plugin => {
      const { name, _before } = plugin
      if (_before == null) {
        return
      }
      if (ordered.includes(_before) === false) {
        return
      }
      ordered.splice(ordered.indexOf(name), 1);
      ordered.splice(ordered.indexOf(_before), 0, name);
    })
    return ordered
  }

  /**
   * @returns {Plugin[]}
   */
  plugins() {
    const order = this.orderedPluginNames()
    return order.map(name => {
      const plugin = this._plugins.get(name)
      if (plugin == null) {
        throw Error(`serious logic error: plugin names ${name} not found`)
      }
      return plugin
    })
  }

  /**
   * @returns {Markdown}
   */
  toMarkdown() {
    const markdown = new Markdown()

    this.plugins().forEach(plugin => {
      if(plugin._plugin == null) {
        throw Error(`serious error: plugin ${plugin.name} has no implementation.`)
      }
      markdown.use(plugin._plugin, plugin._args)
    })
    return markdown
  }
}
