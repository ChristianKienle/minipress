// @ts-check
const { fileToPath } = require('./../../../utils')
const { resolve } = require('path')
const hash = require('hash-sum')
const EventEmitter = require('events')
const chokidar = require('chokidar')

const PAGES_GLOBS = ['**/*.md', '!node_modules/**']
const EVENTS = Object.freeze({
  added: 'mp:pages:added',
  removed: 'mp:pages:removed',
  changed: 'mp:pages:changed',
  ready: 'mp:pages:ready'
})

/** @typedef {import('./../../types')._Page} _Page */
/** @typedef {import('./../../types').Pages} Pages */
/** @typedef {import('./../../types').PagePath} PagePath */

/**
 * @param {PagePath} pagePath
 * @returns {_Page}
 */
const pagePathToPage = pagePath => {
  const regularPath = pagePath.relative
  const _filePath = pagePath.absolute
  const path = fileToPath(pagePath.relative)
  return {
    createKey() {
      return hash(`mp-page-${hash(regularPath + _filePath)}`)
    },
    _filePath,
    path,
    regularPath,
    relativePath: pagePath.relative
  }
}

class PagesProvider {
  /** @param {string} pagesDir */
  constructor(pagesDir) {
    this.pagesDir = pagesDir
    this.emitter = new EventEmitter()
  }

  /** @param {string} relative */
  toPagePath(relative) {
    return {
      relative,
      absolute: resolve(this.pagesDir, relative)
    }
  }

  /** @param {string} relative */
  toPage(relative) {
    const path = this.toPagePath(relative)
    return pagePathToPage(path)
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

  onRemoved(listener) {
    const { emitter } = this
    const event = EVENTS.removed
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

  onChanged(listener) {
    const { emitter } = this
    const event = EVENTS.changed
    const off = () => this.emitter.off(event, listener)
    emitter.on(event, listener)
    return off
  }

  /** @returns {Promise<_Page[]>} */
  resume() {
    const { emitter } = this
    /** @type {Map<string, _Page>} */
    const pages = new Map()
    return new Promise(resolvePromise => {
      let isReady = false
      this.watcher = chokidar.watch(PAGES_GLOBS, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
        cwd: this.pagesDir
      })
        .on('all', (event, path) => {
          if (event === 'add') {
            const page = this.toPage(path)
            pages.set(path, page)
            isReady && emitter.emit(EVENTS.added, page)
          }

          if (event === 'unlink') {
            const page = this.toPage(path)
            pages.delete(path)
            isReady && emitter.emit(EVENTS.removed, page)
          }

          if (event === 'change') {
            const page = this.toPage(path)
            pages.set(path, page)
            isReady && emitter.emit(EVENTS.changed, page)
          }
        })
        .on('ready', () => {
          isReady = true
          emitter.emit(EVENTS.ready, pages.values())
          resolvePromise(Array.from(pages.values()))
        })
    })
  }
}

/**
 * @param {string} pagesDir
 * @returns {Pages}
 */
module.exports = pagesDir => new PagesProvider(pagesDir)
