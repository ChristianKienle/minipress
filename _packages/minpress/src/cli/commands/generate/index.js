// @ts-check
const { VueRenderer } = require('./../../../minpress/vue-renderer')
const { setNodeEnv } = require('./../../utils')

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
    .command('generate', 'generates a static version of your site')
    .option('--outDir <dir>', 'output directory', {
      'default': build.outDir
    })
    .action(options => {
      try {
        (async () => {
          setNodeEnv('production')
          webpack.create('production')
          await minpress.run({ watch: false })
          const pages = minpress.pages.values()
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
