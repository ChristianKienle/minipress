// @ts-check
const { stringify } = require('./../utils')
const { EOL } = require('os')
/** @typedef {import('./../config/types').Component} Component */

module.exports = class Components {
  constructor() {
    /** @type {Map<string, Component>} */
    this.components = new Map()
  }

  [Symbol.iterator]() {
    return this.components.entries()[Symbol.iterator]()
  }

  /**
   * @template T
   * @param {function(Component): T } cb */
  map(cb) {
    return Array.from(this).map(([_, component]) => cb(component))
  }

  /** @param {string} name */
  /** @returns {Component | undefined} */
  get(name) {
    return this.components.get(name)
  }

  /** @param {Component} component */
  set(component) {
    this.components.set(component.name, component)
  }

  /** @param {string} name */
  /** @returns {Component | undefined} */
  delete(name) {
    const component = this.get(name)
    this.components.delete(name)
    return component
  }

  /** @param {Component} component */
  _genImport({ name, path: { absolute } }) {
    return `vue.component(${stringify(name)}, () => import(${stringify(absolute)}))`
  }

  get code() {
    return [
      'const install = vue => {',
      ...this.map(component => this._genImport(component)),
      '};',
      'export default { install };'
    ].join(EOL)
  }
}
