// @ts-check
const EventEmitter = require('events')
const chokidar = require('chokidar')
const { isKnownEvent } = require('./events')

const ChokidarEventToWatcherEvent = event => {
  const mapping = Object.freeze({
    add: 'added',
    change: 'changed',
    unlink: 'removed'
  })
  const watcherEvent = mapping[event]
  if(watcherEvent != null) {
    if(isKnownEvent(watcherEvent) === false) {
      throw Error('internal error')
    }
    return watcherEvent
  }
}

/**
 * @typedef {object} Options
 * @prop {string} dir
 * @prop {string[]} globs
 */
class FsWatcher {
  /**
   *
   * @param {Options} options
   */
  constructor({ dir, globs }) {
    this.dir = dir
    this.globs = globs
    this.emitter = new EventEmitter()
  }

  /**
   * @param {import('./types').Listener} listener
   */
  on(listener) {
    this.emitter.on('all', (event, path) => {
      listener(event, path)
    })
  }

  resume() {
    const handleAllEvent = (event, path) => {
      const internalEvent = ChokidarEventToWatcherEvent(event)
      if(internalEvent == null) {
        return
      }
      this.emitter.emit('all', internalEvent, path)
    }

    const { emitter } = this
    const watcher = chokidar.watch(this.globs, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      cwd: this.dir,
      // This will cause our initial 'watch run'
      // to find the same things that globby already found
      // this is highly inefficient but works around
      // potential race conditions
      ignoreInitial: true
    }).on('all', handleAllEvent)
    this.watcher = watcher
  }

  close() {
    const { watcher } = this
    if(watcher != null) {
      watcher.close()
    }
  }
}

/**
 * @param {Options} options
 * @returns {import('./types').WatcherI}
 */
module.exports = options => new FsWatcher(options)
