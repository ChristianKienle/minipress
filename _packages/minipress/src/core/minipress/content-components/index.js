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

  get code() {
    const components = Array.from(this.byId.values())
    return codeGen.js(() => [
      'export default {',
      components.map(component => component.code).join(', '),
      '}'
    ])
  }
}
