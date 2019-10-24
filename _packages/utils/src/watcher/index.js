// @ts-check

const createFsWatcher = require('./fs-watcher')
const createVirtualWatcher = require('./virtual-watcher')
const { WatcherEvent } = require('./events')
module.exports = {
  WatcherEvent,
  createFsWatcher,
  createVirtualWatcher
}
