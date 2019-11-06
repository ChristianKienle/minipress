// @ts-check
const codeGen = require('@minipress/code-gen')
module.exports = class Components {
  constructor() {
    /** @type {Map.<string, string>} */
    this.byId = new Map()
  }

  /**
   * @param {string} id
   * @param {string} path
   */
  register(id, path) {
    this.byId.set(id, path)
  }

  get paths() {
    return Array.from(this.byId.values())
  }

  /**
   * @param {string} id
   */
  getPath(id) {
    return this.byId.get(id)
  }

  /** @param {number} index */
  _varName(index) {
    return `Component${index}`
  }

  get code() {
    return codeGen.js(c => {
      const components = Array.from(this.byId.entries())
      return [
        ...components.map(([, path], index) => `import ${this._varName(index)} from ${c.stringify(path)}`),
        'const install = vue => {',
        ...components.map(([id], index) => `vue.component(${c.stringify(id)}, ${this._varName(index)})`),
        '};',
        'export default { install };'
      ]
    })
  }
}
