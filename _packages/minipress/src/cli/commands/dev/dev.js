// @ts-check
const http = require('http')
const { VueRenderer } = require('./../../../minipress/vue-renderer')
const { setNodeEnv } = require('./../../utils')

/**
 * @typedef {object} Options
 * @prop {any} cli
 * @prop {import('./../../../minipress/core/minipress')} minipress
 */
/** @param {Options} options */
module.exports = ({ minipress, cli }) => {
  const { log, webpack, config } = minipress
  const { dest, host } = config
  cli
    .command('dev', 'runs miniPress in dev mode in the current directory')
    .option('--port <port>', 'port to use', {
      'default': config.port
    })
    .action(({ port }) => {
      const doIt = async () => {
        setNodeEnv('development')
        webpack.create('development')
        await minipress.run()
        try {
          const renderer = new VueRenderer({ config, webpack, log })
          const server = http.createServer(renderer.getRequestHandler({ dest }))

          server.listen(port, host, () => {
            log.info(`minipress is running on http://${host}:${port}`)
          })
        } catch (err) {
          log.error('Error during runCompiler', err)
        }
      }
      doIt().then(() => console.log('done'))
    })
}
