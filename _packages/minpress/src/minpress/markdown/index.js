// @ts-check

/**
 * @typedef {object} ConfigOptions
 * @prop {import('./../core/minpress')} minpress
 * @prop {import('webpack-chain')} config
 */

/** @param {ConfigOptions} options */
const configureMarkdown = ({ minpress, config }) => {
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
      minpress
    })
    .end()
}

/**
 * @typedef {object} Options
 * @prop {import('./../core/minpress')} minpress
 * @prop {import('./../core/webpack-config')} webpack
 */

/** @param {Options} options */
const installMarkdownSupport = ({ webpack, minpress }) => {
  const { server, client } = webpack
  configureMarkdown({
    minpress,
    config: server
  })
  configureMarkdown({
    minpress,
    config: client
  })
}

module.exports = installMarkdownSupport
