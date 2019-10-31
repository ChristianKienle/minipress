// @ts-check
const { resolve } = require('path')
const EventEmitter = require('events')
const { camelize, Watcher, globby } = require('@minipress/utils')
const GLOBS = ['**/*.vue', '!node_modules/**']
const { WatcherEvent } = Watcher
const nameForContext = require('./name-for-context')
const fs = require('fs-extra')

/** @typedef {import('./types').Component} Component */
/** @typedef {import('./types').Components} Components */
/** @typedef {import('./types').GetComponentName} GetComponentName */
/** @typedef {import('./types')._Components} _Components */
/** @typedef {import('./types').ComponentPath} ComponentPath */
/** @typedef {import('./types').ComponentNameContext} ComponentNameContext */
/** @typedef {import('@minipress/utils/watcher').WatcherI} WatcherI */
/** @typedef {(component: Component)=>void} Listener */

/**
 * @typedef {object} Options
 * @prop {WatcherI=} watcher
 * @prop {string} components
 * @prop {GetComponentName} getComponentName
 */

class ComponentsProvider {
  /** @param {Options} options */
  constructor({ components, watcher, getComponentName }) {
    this.componentsDir = components
    this.watcher = watcher
    this.emitter = new EventEmitter()
    this._getComponentName = getComponentName
  }

  /**
   * @returns {Promise<Component[]>}
   */
  async getComponents() {
    const { componentsDir, watcher, emitter } = this
    if((await fs.pathExists(componentsDir)) === false) {
      return []
    }
    const paths = await globby(GLOBS, { cwd: componentsDir })
    const initialComponents = paths.map(path => this.pathToComponent(path))
    if (watcher != null) {
      watcher.on((event, path) => {
        const component = this.filePathToComponent(path)
        emitter.emit(event, component)
      })
      setTimeout(() => watcher.resume())
    }
    return initialComponents
  }

  /**
   * @param {string} relative
   * @returns {ComponentPath}
  */
  toComponentPath(relative) {
    return {
      relative,
      absolute: resolve(this.componentsDir, relative)
    }
  }

  close() {
    if (this.watcher) {
      this.watcher.close()
    }
    this.emitter.removeAllListeners()
  }

  /** @param {Listener} listener */
  onAdded(listener) {
    this.emitter.on(WatcherEvent.ADDED, listener)
    return this
  }

  /** @param {Listener} listener */
  onRemoved(listener) {
    this.emitter.on(WatcherEvent.REMOVED, listener)
    return this
  }

  /** @param {Listener} listener */
  onChanged(listener) {
    this.emitter.on(WatcherEvent.CHANGED, listener)
    return this
  }

  /**
   * @param {ComponentPath} path
   * @return {Component}
   */
  pathToComponent(path) {
    return {
      path,
      name: this.nameForComponent({ path })
    }
  }

  /**
   * @param {string} filePath
   * @return {Component}
   */
  filePathToComponent(filePath) {
    const path = this.toComponentPath(filePath)
    return this.pathToComponent(path)
  }

  /**
   * @param {ComponentNameContext} context
   */
  nameForComponent(context) {
    const defaultName = nameForContext(context)
    return this._getComponentName(context, defaultName)
  }
}

/**
 * @param {Options} options
 * @returns {_Components}
 */
module.exports = options => new ComponentsProvider(options)
