// @ts-check

const PLUGIN = '@minipress/plugin-command-generate'

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress) {
    minipress.hooks.extendCli.tapPromise(PLUGIN, async () => {
      const { log, config, cli } = minipress
      const { build } = config
      cli
        .command('generate', 'generates a static version of your site')
        .option('--outDir <dir>', 'output directory', {
          'default': build.outDir
        })
        .action(async ({ outDir }) => {
          try {
            await minipress.generate({
              outDir,
              mode: 'production'
            })
            log.success('done')
          } catch (error) {
            log.error(error)
          }
        })
    })
  }
}
