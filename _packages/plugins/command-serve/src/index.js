// @ts-check
const Path = require('path')
const express = require('express')
const serveStatic = require('serve-static')
const PLUGIN = '@minipress/plugin-command-serve'

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress) {
    minipress.hooks.extendCli.tapPromise(PLUGIN, async () => {
      const { log, config, cli } = minipress
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
            app.use(build.base, serveStatic(Path.resolve(dir)))
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
    })
  }
}
