// @ts-check
/**
 * @param {string} name
 * @param {string} path
 */
const addAlias = (name, path) =>
  /** @param {import('webpack-chain')} config */
  config => config.resolve.alias.set(name, path)

module.exports = class Aliases {
  constructor() {
    /** @type {Map.<string, string>} */
    this.byName = new Map() // maps name to path
  }

  /** @param {import('webpack-chain')} config */
  addToConfig(config) {
    const aliases = Array.from(this.byName.entries())
    aliases.forEach(([name, path]) => addAlias(name, path)(config))
  }

  /**
   * @param {string} name
   * @param {string} path
   */
  register(name, path) {
    this.byName.set(name, path)
  }
}
