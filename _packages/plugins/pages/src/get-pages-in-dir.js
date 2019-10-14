// @ts-check
const { join } = require('path')
const EventEmitter = require('events')
const globby = require('globby')
const { createPageKey, relativePathToUrlPath } = require('@minipress/utils')

const PAGES_GLOBS = ['**/*.md', '**/*.vue', '!node_modules/**']
const EVENTS = Object.freeze({
  added: 'added',
  removed: 'removed',
  changed: 'changed'
})

/** @typedef {import('@minipress/types').Page} Page */
/** @typedef {import('@minipress/types').File} File */
/** @typedef {(page: Page)=>void} Listener */
/** @typedef {import('@minipress/utils/watcher').WatcherI} WatcherI */

class PagesProvider {
  /**
   * @param {string} pagesDir
   * @param {import('@minipress/utils/watcher').WatcherI} watcher
   */
  constructor(pagesDir, watcher) {
    this.pagesDir = pagesDir
    this.watcher = watcher
    this.emitter = new EventEmitter()
    this.stopListeningFn = () => {}
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
    this.emitter.removeAllListeners()
    if (this.watcher) {
      this.stopListeningFn()
      this.watcher.close()
    }
  }

  /** @param {Listener} listener */
  onAdded(listener) {
    this.emitter.on('added', listener)
    return this
  }

  /** @param {Listener} listener */
  onRemoved(listener) {
    this.emitter.on('removed', listener)
    return this
  }

  /** @param {Listener} listener */
  onChanged(listener) {
    this.emitter.on('changed', listener)
    return this
  }

  /**
   * @param {{watch: boolean}} options
   * @returns {Promise<Page[]>}
   */
  async getPages({ watch } = { watch: false }) {
    const relativePaths = await globby(PAGES_GLOBS, {
      cwd: this.pagesDir
    })
    const pages = relativePaths.map(relative => this.relativePathToPage(relative))
    if (watch) {
      const { emitter } = this
      this.watcher.on((event, path) => {
        const page = this.relativePathToPage(path)
        emitter.emit(event, page)
      })
      this.watcher.resume()
    }
    return pages
  }
}

/**
 * @param {string} pagesDir
 * @param {WatcherI} watcher
 */
module.exports = (pagesDir, watcher) => new PagesProvider(pagesDir, watcher)
