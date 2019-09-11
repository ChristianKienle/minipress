// @ts-check
const Path = require('path')
const { resolve } = Path
const EventEmitter = require('events')
const chokidar = require('chokidar')

const GLOBS = ['**/*.vue', '!node_modules/**']
const EVENTS = Object.freeze({
  added: 'mp:component:added',
  removed: 'mp:component:removed',
  changed: 'mp:component:changed',
  ready: 'mp:components:ready'
})

/** @typedef {import('./../types').Component} Component */
/** @typedef {import('./../types').Components} Components */
/** @typedef {import('./../types').ComponentPath} ComponentPath */
/** @typedef {import('./../types').ComponentNameContext} ComponentNameContext */

class ComponentsProvider {
  /** @param {string} componentsDir */
  constructor(componentsDir) {
    this.componentsDir = componentsDir
    this.emitter = new EventEmitter()
  }

  /** @param {string} relative */
  /** @returns {ComponentPath} */
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

  onAdded(listener) {
    const { emitter } = this
    const event = EVENTS.added
    const off = () => emitter.off(event, listener)
    emitter.on(event, listener)
    return off
  }

  onReady(listener) {
    const { emitter } = this
    const event = EVENTS.ready
    const off = () => emitter.off(event, listener)
    emitter.on(event, listener)
    return off
  }

  onRemoved(listener) {
    const { emitter } = this
    const event = EVENTS.removed
    const off = () => emitter.off(event, listener)
    emitter.on(event, listener)
    return off
  }

  onChanged(listener) {
    const { emitter } = this
    const event = EVENTS.changed
    const off = () => this.emitter.off(event, listener)
    emitter.on(event, listener)
    return off
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

  /** @returns {Promise<Component[]>} */
  resume() {
    const { emitter } = this

    /** @type {Map<string, Component>} */
    const components = new Map()
    return new Promise(resolvePromise => {
      this.watcher = chokidar.watch(GLOBS, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
        cwd: this.componentsDir
      }).on('all', (event, path) => {
        if (event === 'add') {
          const component = this.filePathToComponent(path)
          components.set(path, component)
          emitter.emit(EVENTS.added, component)
        }
        if (event === 'unlink') {
          const component = this.filePathToComponent(path)
          components.delete(path)
          emitter.emit(EVENTS.removed, component)
        }
        if (event === 'change') {
          const component = this.filePathToComponent(path)
          components.set(path, component)
          emitter.emit(EVENTS.changed, component)
        }
      })
        .on('ready', () => {
          emitter.emit(EVENTS.ready, components.values())
          resolvePromise(Array.from(components.values()))
        })
    })
  }

  /** @param {ComponentNameContext} context */
  nameForComponent({ path }) {
    const parsed = Path.parse(path.relative)
    const formatted = Path.format({
      dir: parsed.dir,
      name: parsed.name
    })
    return formatted.split(Path.sep).join('--')
  }
}


/**
 * @param {string} componentsDir
 * @returns {Components}
 */
module.exports = componentsDir => new ComponentsProvider(componentsDir)
