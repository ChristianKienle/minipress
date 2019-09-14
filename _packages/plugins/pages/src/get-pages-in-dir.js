// @ts-check
const { resolve } = require('path')
const EventEmitter = require('events')
const chokidar = require('chokidar')
const { createPageKey, relativePathToUrlPath } = require('@minipress/utils')

const PAGES_GLOBS = ['**/*.md', '**/*.vue', '!node_modules/**']
const EVENTS = Object.freeze({
  added: 'mp:pages:added',
  removed: 'mp:pages:removed',
  changed: 'mp:pages:changed',
  ready: 'mp:pages:ready'
})

/** @typedef {import('@minipress/types').Page} Page */
/** @typedef {import('@minipress/types').File} File */
/** @typedef {(page)=>void} Listener */

/**
 * @param {File} file
 * @returns {Page}
 */
const pagePathToPage = ({ relative, absolute }) => {
  const path = relativePathToUrlPath(relative)
  const key = createPageKey(absolute)
  return {
    key,
    path,
    file: {
      relative,
      absolute
    }
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

  /** @param {Listener} listener */
  onAdded(listener) {
    const { emitter } = this
    const event = EVENTS.added
    const off = () => emitter.off(event, listener)
    emitter.on(event, listener)
    return off
  }

  /** @param {Listener} listener */
  onRemoved(listener) {
    const { emitter } = this
    const event = EVENTS.removed
    const off = () => emitter.off(event, listener)
    emitter.on(event, listener)
    return off
  }

  /** @param {(pages: Page[]) => void} listener */
  onReady(listener) {
    const { emitter } = this
    const event = EVENTS.ready
    const off = () => emitter.off(event, listener)
    emitter.on(event, listener)
    return off
  }

  /** @param {Listener} listener */
  onChanged(listener) {
    const { emitter } = this
    const event = EVENTS.changed
    const off = () => this.emitter.off(event, listener)
    emitter.on(event, listener)
    return off
  }

  /** @returns {Promise<Page[]>} */
  resume() {
    const { emitter } = this
    /** @type {Map<string, Page>} */
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
 */
module.exports = pagesDir => new PagesProvider(pagesDir)
