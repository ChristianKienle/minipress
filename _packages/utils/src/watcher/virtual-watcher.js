// @ts-check
const EventEmitter = require('events')

class VirtualWatcher {
  constructor() {
    this.emitter = new EventEmitter()
  }

  /**
   * @param {string} path
   */
  addFile(path) {
    this.emitter.emit('all', 'added', path)
  }

  /**
   * @param {string} path
   */
  changeFile(path) {
    this.emitter.emit('all', 'changed', path)
  }

  /**
   * @param {string} path
   */
  removeFile(path) {
    this.emitter.emit('all', 'removed', path)
  }

  /**
   * @param {import('./types').Listener} listener
   */
  on(listener) {
    this.emitter.on('all', (event, path) => {
      listener(event, path)
    })
  }

  close() {}
  resume() {}
}

/**
 * @returns {VirtualWatcher & import('./types').WatcherI}
 */
module.exports = () => new VirtualWatcher()
