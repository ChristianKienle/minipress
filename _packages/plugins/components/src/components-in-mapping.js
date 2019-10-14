// @ts-check
const EventEmitter = require('events')
const EVENTS = Object.freeze({
  ready: 'mp:components:ready'
})

/** @typedef {import('./types').Component} Component */
/** @typedef {import('./types').ComponentNameByPath} ComponentsMapping */
/** @typedef {import('./types')._Components} _Components */
/** @typedef {import('./types').ComponentPath} ComponentPath */
/** @typedef {import('./types').ComponentNameContext} ComponentNameContext */

class ComponentsInMapping {
  /**
   * @param {ComponentsMapping} components
   */
  constructor(components) {
    this.components = components
    this.events = new EventEmitter()
  }

  close() {

  }

  /** @param {any} _ */
  onAdded(_) {
    return this.off
  }

  off() { }

  /** @param {any} listener */
  onReady(listener) {
    const { events } = this
    const event = EVENTS.ready
    const off = () => this.events.off(event, listener)
    events.on(event, listener)
    return off
  }

  /** @param {any} _ */
  onRemoved(_) {
    return this.off
  }

  /** @param {any} _ */
  onChanged(_) {
    return this.off
  }

  /** @returns {Promise<Component[]>} */
  async resume() {
    /** @type {Map<string, Component>} */
    const componentsByPath = new Map()
    Object.entries(this.components).forEach(([name, path]) => {
      componentsByPath.set(path, {
        name,
        path: {
          absolute: path
        }
      })
    })
    const componentsValues = Array.from(componentsByPath.values())

    this.events.emit(EVENTS.ready, componentsValues)
    return componentsValues
  }

  /** @param {ComponentNameContext} context */
  nameForComponent(context) {
    const component = Object.entries(this.components).find(([, path]) => context.path.absolute === path)
    if (component != null) {
      const [name] = component
      return name
    }
    throw Error('Logic Error')
  }
}

/**
 * @param {ComponentsMapping} mapping
 * @returns {_Components}
 */
module.exports = mapping => new ComponentsInMapping(mapping)
