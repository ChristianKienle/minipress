// @ts-check
const Path = require('path')
const ghpages = require('gh-pages')

const PLUGIN = '@minipress/plugin-deploy-to-gh-pages'

/** @type {import('./types').Plugin} */
module.exports = {
  optionsSchema({joi}) {
    return joi.object({
      skipGenerate: joi.boolean().default(false),
      // @ts-ignore
      ghpagesOptions: joi.object().default(ghpages.defaults)
    }).default({
      skipGenerate: false,
      // @ts-ignore
      ghpagesOptions: ghpages.defaults
    })
  },
  async apply(minipress, options) {

    minipress.hooks.extendCli.tapPromise(PLUGIN, async () => {
      const { log, config, cli } = minipress
      const { build } = config
      cli
        .command('deploy-to-gh-pages', 'deploys your site to GitHub Pages')
        .option('--outDir <dir>', 'path to your statically generated site', {
          'default': build.outDir
        })
        .action(async ({ outDir }) => {
          try {
            if(options.skipGenerate === false) {
              await minipress.generate({
                outDir,
                mode: 'production'
              })
              log.success('site generated')
            }
            log.info(`Deploying ${outDir} to GitHub Pages…`)
            ghpages.publish(outDir, options.ghpagesOptions, error => {
              if (error != null) {
                log.error(`Unable to publish to gh-pages`)
                log.error(`Error: ${error && error.toString()}`)
                return
              }
              log.success(`Published!`)
            })
          } catch (err) {
            log.error('Deployment to GitHub Pages failed:', err)
          }
        })
    })
  }
}
