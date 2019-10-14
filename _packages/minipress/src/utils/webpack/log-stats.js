// @ts-check

/**
 * @typedef {object} Options
 * @prop {'errors-only' | 'everything' | 'none'} [level='errors-only']
 * @prop {import('@minipress/log')} log
 */
/**
 * @param {import('webpack').Stats} stats
 * @param {Options} options
 */
module.exports = (stats, { log, level = 'errors-only' }) => {
  if (level === 'none') {
    return
  }
  if (stats.hasErrors()) {
    log.error(stats.toString('errors-only'))
  }
}
