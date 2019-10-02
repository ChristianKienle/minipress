// @ts-check

/**
 * @param {string} name
 */
const fullName = name => `#minipress/dynamic/${name}`

module.exports = class DynamicModules {
  /**
   * @param {import('./minipress')} minipress
   */
  constructor(minipress) {
    /** @type {Map.<string, string>} */
    this.byName = new Map() // maps name to code

    minipress.hooks.registerAliases.tapPromise('dynamic modules', async () => {
      const modules = Array.from(this.byName.entries())
      modules.forEach(([name]) => {
        const path = minipress.tempDir.resolveTemp(`dynamic-modules/${name}`)
        minipress.aliases.register(fullName(name), path)
      })
    })

    minipress.hooks.emitDynamicModules.tapPromise('dynamic modules', async () => {
      const modules = Array.from(this.byName.entries())
      modules.forEach(([name, code]) => {
        const path = `dynamic-modules/${name}`
        minipress.tempDir.writeTemp(path, code)
      })
    })
  }

  /**
   * @param {string} id
   * @param {string} code
   */
  register(id, code) {
    this.byName.set(id, code)
  }
}
