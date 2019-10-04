// @ts-check

/**
 * @typedef {object} Options
 * @prop {any} cli
 * @prop {import('@minipress/types').MinipressI} minipress
 */
/** @param {Options} options */
module.exports = ({ minipress, cli }) => {
  const { log, config } = minipress
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
        log.success('YAY')
      } catch (error) {
        log.error(error)
      }
    })
}
