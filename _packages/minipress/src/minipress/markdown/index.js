// @ts-check

/**
 * @typedef {object} ConfigOptions
 * @prop {import('./../core/minipress')} minipress
 * @prop {import('webpack-chain')} config
 */

/** @param {ConfigOptions} options */
const configureMarkdown = ({ minipress, config }) => {
  config.module
    .rule('md')
    .test(/\.md/)
    .use('vue-loader')
    .loader('vue-loader')
    .options({
      compilerOptions: {
        whitespace: 'condense'
      }
    })
    .end()
    .use('markdown-loader')
    .loader(require.resolve('./loaders/markdown-loader.js'))
    .options({
      minipress
    })
    .end()
}

/**
 * @typedef {object} Options
 * @prop {import('./../core/minipress')} minipress
 * @prop {import('./../core/webpack-config')} webpack
 */

/** @param {Options} options */
const installMarkdownSupport = ({ webpack, minipress }) => {
  const { server, client } = webpack
  configureMarkdown({
    minipress,
    config: server
  })
  configureMarkdown({
    minipress,
    config: client
  })
}

module.exports = installMarkdownSupport
