// @ts-check
const createPageKey = require('./create-page-key')
const setNodeEnv = require('./set-node-env')
const pathUtils = require('./paths')
const stringify = JSON.stringify
const devalue = require('devalue')
const Watcher = require('./watcher')

module.exports = {
  createPageKey,
  // Use this to create a hash that represents the 'value' of a page.
  // Currently we simply use 'createPageKey' to do this.
  createPageHash: createPageKey,
  setNodeEnv,
  ...pathUtils,
  stringify,
  //@ts-ignore
  devalue:  /** @type { (value: any) => string } */ (devalue),
  Watcher
}
