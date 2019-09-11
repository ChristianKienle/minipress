// @ts-check
const { VueRenderer } = require('./../../../minpress/vue-renderer')
const { setNodeEnv } = require('./../../utils')

var express = require('express')
var serveStatic = require('serve-static')
const path = require('path')

/**
 * @typedef {object} Options
 * @prop {any} cli
 * @prop {import('./../../../minpress/core/minpress')} minpress
 */
/** @param {Options} options */
module.exports = ({ minpress, cli }) => {
  const { log, webpack, config } = minpress
  const { build } = config
  cli
    .command('serve', 'serves a static version of your site')
    .option('--dir <dir>', 'directory', {
      'default': build.outDir
    })
    .option('--port <port>', 'port to use', {
      'default': config.port
    })
    .action(options => {
      try {
        (async () => {
          log.info(`base: ${build.base}`)
          setNodeEnv('development')
          webpack.create('development')
          const port = options.port
          const dir = path.resolve(options.dir)
          const app = express()
          app.use(build.base, serveStatic(dir))
          // app.options.p
          const listener = app.listen(port, () => {
            const addr = listener.address()
            if(typeof addr !== 'object' || addr == null) {
              throw Error('invalid address')
            }
            log.info(`MinPress is running on http://${addr.address}:${addr.port}`)
          })

        })()
      } catch (err) {
        log.error('Error during serve', err)
      }
    })
}
