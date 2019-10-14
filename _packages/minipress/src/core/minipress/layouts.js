// @ts-check
const Components = require('./components')

module.exports = class Layouts {
  constructor() {
    this.components = new Components()
  }

  /**
   * @param {string} id
   * @param {string} path
   */
  register(id, path) {
    const layoutId = `mp-layout-${id}`
    this.components.register(layoutId, path)
  }

  get code() {
    return this.components.code
  }
}