// @ts-check
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

/**
 * @typedef {object} Options
 * @prop {any} cli
 * @prop {import('./../../../core/minipress')} minipress
 */
/** @param {Options} options */
module.exports = ({ minipress, cli }) => {
  const { log, config } = minipress
  const { build } = config
  cli
    .command('serve', 'serves a static version of your site')
    .option('--dir <dir>', 'directory', {
      'default': build.outDir
    })
    .option('--port <port>', 'port to use', {
      'default': config.port
    })
    .action(async ({ port, dir }) => {
      try {
        log.info(`base: ${build.base}`)
        const app = express()
        app.use(build.base, serveStatic(path.resolve(dir)))
        const listener = app.listen(port, () => {
          const addr = listener.address()
          if (typeof addr !== 'object' || addr == null) {
            throw Error('invalid address')
          }
          log.info(`minipress is running on http://${addr.address}:${addr.port}`)
        })
      } catch (err) {
        log.error('Error during serve', err)
      }
    })
}
