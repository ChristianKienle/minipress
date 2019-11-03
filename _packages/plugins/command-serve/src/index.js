// @ts-check
const PLUGIN = '@minipress/plugin-command-serve'
const serve = require('./serve')

/** @type {import('./types').Plugin} */
module.exports = {
  serve,
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
          const result = await serve(config, { port, dir })
          log.info(`minipress is running on ${result.url}`)
        })
    })
  }
}
