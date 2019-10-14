// @ts-check

const PLUGIN = '@minipress/plugin-command-dev'

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress) {
    minipress.hooks.extendCli.tapPromise(PLUGIN, async () => {
      const { config, cli } = minipress
      const { host } = config
      cli
        .command('dev', 'runs miniPress in dev mode in the current directory')
        .option('--port <port>', 'port to use', {
          'default': config.port
        })
        .action(async ({ port }) => {
          await minipress.dev({ port, host, watch: true, mode: 'development' })
        })
    })
  },

  // If you don't want to validate your options
  // delete 'optionsSchema'.
  optionsSchema({ joi }) {
    return joi.any()
  },
}
