// @ts-check
const { join } = require('path')
const EventEmitter = require('events')
const chokidar = require('chokidar')
const globby = require('globby')
const { createPageKey, relativePathToUrlPath } = require('@minipress/utils')

const PAGES_GLOBS = ['**/*.md', '**/*.vue', '!node_modules/**']
const EVENTS = Object.freeze({
  added: 'mp:pages:added',
  removed: 'mp:pages:removed',
  changed: 'mp:pages:changed'
})

/** @typedef {import('@minipress/types').Page} Page */
/** @typedef {import('@minipress/types').File} File */
/** @typedef {(page: Page)=>void} Listener */

class PagesProvider {
  /** @param {string} pagesDir */
  constructor(pagesDir) {
    this.pagesDir = pagesDir
    this.emitter = new EventEmitter()
  }

  /** @param {string} relative */
  relativePathToPage(relative) {
    const absolute = join(this.pagesDir, relative)
    const file = {
      relative,
      absolute
    }
    return { file }
  }

  close() {
    if (this.watcher) {
      this.watcher.close()
    }
    this.emitter.removeAllListeners()
  }

  /** @param {Listener} listener */
  onAdded(listener) {
    this.emitter.on(EVENTS.added, listener)
    return this
  }

  /** @param {Listener} listener */
  onRemoved(listener) {
    this.emitter.on(EVENTS.removed, listener)
    return this
  }

  /** @param {Listener} listener */
  onChanged(listener) {
    this.emitter.on(EVENTS.changed, listener)
    return this
  }

  /**
   * @param {{watch: boolean}} options
   * @returns {Promise<Page[]>}
   */
  async getPages({ watch } = { watch: false }) {
    const relativePaths = await globby(PAGES_GLOBS, { cwd: this.pagesDir })
    const pages = relativePaths.map(relative => this.relativePathToPage(relative))
    if (watch) {
      const { emitter } = this
      this.watcher = chokidar.watch(PAGES_GLOBS, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
        cwd: this.pagesDir,
        ignoreInitial: true
      }).on('all', (event, path) => {
        const pagesEvent = (() => {
          const mapping = {
            add: EVENTS.added,
            change: EVENTS.changed,
            unlink: EVENTS.removed
          }
          return mapping[event]
        })()
        if (pagesEvent == null) {
          return
        }
        const page = this.relativePathToPage(path)
        emitter.emit(pagesEvent, page)
      })
    }
    return pages
  }
}

/**
 * @param {string} pagesDir
 */
module.exports = pagesDir => new PagesProvider(pagesDir)
