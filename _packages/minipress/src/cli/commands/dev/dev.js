// @ts-check

/**
 * @typedef {object} Options
 * @prop {any} cli
 * @prop {import('./../../../core/minipress')} minipress
 */
/** @param {Options} options */
module.exports = ({ minipress, cli }) => {
  const { config } = minipress
  const { host } = config
  cli
    .command('dev', 'runs miniPress in dev mode in the current directory')
    .option('--port <port>', 'port to use', {
      'default': config.port
    })
    .action(async ({ port }) => {
      await minipress.serve({ port, host, watch: true, mode: 'development' })
    })
}
