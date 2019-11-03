// @ts-check
const createPageKey = require('./create-page-key')
const setNodeEnv = require('./set-node-env')
const pathUtils = require('./paths')
const stringify = JSON.stringify
const devalue = require('devalue')
const Watcher = require('./watcher')
const getPkgJson = require('./get-pkg-json')
const removeTrailingSlash = require('./remove-trailing-slash')
const camelize = require('./camelize')
const slugify = require('slugify').default
const globby = require('./globby')
const pathToComponentName = require('./path-to-component-name')
const TempDir = require('./temp-dir')
const nanoid = require('nanoid')

module.exports = {
  nanoid,
  TempDir,
  createTempDir: () => new TempDir(),
  createPageKey,
  // Use this to create a hash that represents the 'value' of a page.
  // Currently we simply use 'createPageKey' to do this.
  createPageHash: createPageKey,
  setNodeEnv,
  ...pathUtils,
  stringify,
  //@ts-ignore
  devalue:  /** @type { (value: any) => string } */ (devalue),
  Watcher,
  getPkgJson,
  removeTrailingSlash,
  camelize,
  /**
   * @param {string} input
   * @returns {string}
   */
  slugify(input) {
    return slugify(input)
  },
  globby,
  pathToComponentName
}
