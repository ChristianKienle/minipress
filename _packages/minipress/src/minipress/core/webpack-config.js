// @ts-check

const { createClientConfig, createBaseConfig, createServerConfig } = require('./../../webpack')
const assert = require('assert')

/**
 * @param {null | import('webpack-chain')}  config
 * @returns {config is import('webpack-chain')}
 */
const isWpConfig = config => config != null

/**
 * @typedef {object} Options
 * @prop {any} log
 * @prop {import('./../config/config')} config

 */
class MinipressWebpackConfig {
  /** @param {Options} options */
  constructor(options) {
    this.config = options.config
    this.log = options.log
    /** @type {null | import('webpack-chain')} */
    this.server = null
    /** @type {null | import('webpack-chain')} */
    this.client = null
  }

  /** @param {'development' | 'production'} mode */
  create(mode) {
    this.log.info(`Creating Webpack Configuration (${mode})`)
    assert(this.client == null)
    assert(this.server == null)
    const baseOptions = { minipressConfig: this.config }
    const dest = this.config.dest
    this.server = createServerConfig(
      createBaseConfig({ ...baseOptions, isServer: true }),
      { ...baseOptions, dest }
    )

    this.client = createClientConfig(
      createBaseConfig({ ...baseOptions, isServer: false }),
      { ...baseOptions, dest }
    )
  }

  asseertChains() {
    const { server, client } = this
    if (!isWpConfig(server) || !isWpConfig(client)) {
      throw Error('asseertChains expects that setup() has been called already. Make sure to call setup() before using asseertChains.')
    }
    return { server, client }
  }

  configs() {
    const { server, client } = this
    if (!isWpConfig(server) || !isWpConfig(client)) {
      throw Error('Logic Error')
    }
    return {
      server: server.toConfig(),
      client: client.toConfig()
    }
  }

  /** @param {string} dest */
  setDest(dest) {
    const { server, client } = this
    if (!isWpConfig(server) || !isWpConfig(client)) {
      throw Error('Logic Error')
    }

    client
      .output
      .path(dest)
      .filename('[name].[hash:8].js')
      .end()

    server
      .output
      .path(dest)
      .end()
  }
}

module.exports = MinipressWebpackConfig
