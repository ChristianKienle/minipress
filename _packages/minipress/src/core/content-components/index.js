// @ts-check
const codeGen = require('@minipress/code-gen')
const ContentComponent = require('./content-component')

/**
 * @typedef {import('./types').ContentComponentI} ContentComponentI
 */

module.exports = class ContentComponents {
  constructor() {
    /** @type {Map.<string, ContentComponent>} */
    this.byId = new Map()
  }

  /**
   * @param {string} id
   * @param {ContentComponentI} component
   */
  register(id, component) {
    this.byId.set(id, new ContentComponent({ ...component }))
  }

  /**
   * @param {string} id
   */
  remove(id) {
    this.byId.delete(id)
  }

  /**
   * @param {string} id
   * @returns {ContentComponentI | undefined}
   */
  get(id) {
    return this.byId.get(id)
  }

  get code() {
    const components = Array.from(this.byId.values())
    return codeGen.js(() => [
      'export default {',
      components.map(component => component.code).join(', '),
      '}'
    ])
  }
}
