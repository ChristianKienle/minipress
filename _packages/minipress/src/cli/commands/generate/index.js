// @ts-check
const { VueRenderer } = require('./../../../vue-renderer')
const { setNodeEnv } = require('./../../utils')

/**
 * @typedef {object} Options
 * @prop {any} cli
 * @prop {import('./../../../core/minipress')} minipress
 */
/** @param {Options} options */
module.exports = ({ minipress, cli }) => {
  const { log, webpack, config } = minipress
  const { build } = config
  cli
    .command('generate', 'generates a static version of your site')
    .option('--outDir <dir>', 'output directory', {
      'default': build.outDir
    })
    .action(options => {
      try {
        (async () => {
          setNodeEnv('production')
          webpack.create('production')
          await minipress.run({ watch: false })
          const pages = minipress.pages.values()
          const outDir = options.outDir
          const renderer = new VueRenderer({ config, webpack, log })
          await renderer.build()
          await renderer.generate({
            pages,
            outDir,
            dest: config.dest
          })
        })()
      } catch (err) {
        log.error('Error during runCompiler', err)
      }
    })
}
