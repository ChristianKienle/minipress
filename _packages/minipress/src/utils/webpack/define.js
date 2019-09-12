// @ts-check
const stringfify = require('./../stringify')

/**
 * @typedef {import('webpack-chain')} Chain
 * @typedef {object} Options
 * @prop {string} key
 * @prop {string | boolean} value
 */

/**
 * @param {Chain} config
 * @param {Options} options
 */
const define = (config, { key, value }) => config
  .plugin('define')
  .tap(([definitions]) => [{
    ...definitions,
    [key]: typeof value === 'string' ? stringfify(value) : value
  }])
  .end()

class Define {
  /** @param {Chain} config */
  constructor(config) {
    this.config = config
  }

  /** @param {string} key */
  set(key) {
    // eslint-disable-next-line consistent-this
    const that = this
    const { config } = this
    return {
      /** @param {string | boolean } value */
      to(value) {
        define(config, { key, value })
        return that
      }
    }
  }

  end() {
    return this.config.end()
  }
}

/** @param {Chain} config */
module.exports = config => new Define(config)
