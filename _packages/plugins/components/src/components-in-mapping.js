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
/** @typedef {(component: Component)=>void} Listener */

class ComponentsInMapping {
  /**
   * @param {ComponentsMapping} components
   */
  constructor(components) {
    this.components = components
    this.events = new EventEmitter()
  }

  close() {}

  /** @param {Listener} _ */
  onAdded(_) {
    return this
  }

  /** @param {Listener} _ */
  onRemoved(_) {
    return this
  }

  /** @param {Listener} _ */
  onChanged(_) {
    return this
  }

  /** @returns {Promise<Component[]>} */
  async getComponents() {
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
