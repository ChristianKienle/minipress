// @ts-check
const WebpackChain = require('webpack-chain')
const Webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const define = require('./../utils/webpack/define')

const createBabelOptions = () => ({
  // do not pick local project babel config (.babelrc)
  babelrc: false,
  // do not pick local project babel config (babel.config.js)
  // ref: http://babeljs.io/docs/en/config-files
  configFile: false,
  presets: [
    require.resolve('@babel/preset-env')
  ],
  plugins: [
    require.resolve('@babel/plugin-syntax-dynamic-import'),
    [require('@babel/plugin-transform-runtime').default,
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules: false,
        // Undocumented option that lets us encapsulate our runtime, ensuring
        // the correct version is used
        // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
        absoluteRuntime: path.dirname(
          require.resolve('@babel/runtime/package.json')
        )
      }]
  ]
})

/**
 * @typedef {object} Options
 * @prop {boolean} isServer
 * @prop {import('@minipress/types')._Config} minipressConfig
 */

/** @param {Options} options */
module.exports = function createBase({ isServer, minipressConfig }) {
  // eslint-disable-next-line no-use-before-define
  const modulePaths = getModulePaths()
  const isProd = process.env.NODE_ENV === 'production'
  const isDev = !isProd
  const mode = isProd ? 'production' : 'development'
  const config = new WebpackChain()

  config.mode(mode).end()
  config.stats('errors-only').end()
  // Configure source maps:
  // I am not really sure what the best practice is.
  // For a long time I used the following settings:
  // - server config: source-map
  // - client config: source-map (but only in development)
  // Those settings are replaced by the following settings which are used
  // by saber. There must be a reason. Why?
  // Use 'source-map' when running on the server side
  // Use 'cheap-module-source-map' on the client side but only in development.
  config.devtool(isServer ? 'source-map' : (isDev ? 'cheap-module-source-map' : false))
  // For some reason this is needed. Otherwise vue will be bundled twice.
  config.resolve.alias.set('vue$', require.resolve('vue'))
  config.resolve.alias.set('webpack-hot-middleware/client$', require.resolve('webpack-hot-middleware/client'))
  // Not sure why the following two settings are needed – it is done so by VuePress.
  config
    .resolveLoader.set('symlinks', true)
    .modules.merge(modulePaths)
  config.resolve.set('symlinks', true)
  // Configure output settings
  config
    .output
    .publicPath(minipressConfig.build.base)
    .path(minipressConfig.dest)
    .filename('assets/js/[name].js')
    .end()
  config.module.rule('js').test(/\.js$/).exclude.add(/node_modules/).add(/\.vue\.js/)
    .end()

  // TODO: Where is this from?
  config
    .module
    .rule('js')
    .use('babel-loader')
    .loader('babel-loader')
    .options(createBabelOptions())
    .end()

  // Resolve dependencies
  config.resolve.modules.add('node_modules')

  // Complicated CSS Support
  // Stolen from VuePress
  // Need to simplify
  function createCSSRule(lang, test, loader, options) {
    const baseRule = config.module.rule(lang).test(test)
    // const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/)
    const normalRule = baseRule.oneOf('normal')

    function applyLoaders(rule) {
      if (!isServer) {
        if (isProd) {
          rule.use('extract-css-loader').loader(CSSExtractPlugin.loader)
        } else {
          rule.use('vue-style-loader').loader('vue-style-loader')
        }
      }

      rule.use('css-loader')
        .loader('css-loader')
        .options({
          importLoaders: 1,
          sourceMap: !isProd,
          onlyLocals: isServer
        })

      if (loader) {
        rule.use(loader).loader(loader)
          .options(options)
      }
    }

    // applyLoaders(modulesRule)
    applyLoaders(normalRule)
  }

  const scssOptions = {}
  const sassOptions = {}
  const stylusOptions = {}
  createCSSRule('css', /\.css$/)
  createCSSRule('postcss', /\.p(ost)?css$/, 'postcss-loader',
    {
      plugins: [require('autoprefixer')]
    })
  createCSSRule('scss', /\.scss$/, 'sass-loader', scssOptions)
  createCSSRule('sass', /\.sass$/, 'sass-loader', Object.assign({ indentedSyntax: true }, sassOptions))
  createCSSRule('stylus', /\.styl(us)?$/, 'stylus-loader', Object.assign({
    preferPathResolver: 'webpack'
  }, stylusOptions))

  config.module.rule('url').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: 10000,
      name: 'images/[name].[hash:8].[ext]'
    })
    .end()

  config
    .plugin('extract-css-plugin')
    .use(CSSExtractPlugin)
    .tap(() => [{ filename: 'style.css' }])
    .end()

  config
    .plugin('vue')
    .use(VueLoaderPlugin)
    .end()

  config
    .plugin('define')
    .use(Webpack.DefinePlugin, [{}])
    .end()

  const tempDir = path.relative(minipressConfig.cwd, minipressConfig.tempDir)
  define(config)
    .set('process.env.NODE_ENV')
    .to(mode)
    .set('process.server')
    .to(isServer)
    .set('process.client')
    .to(!isServer)
    .set('process.minipress.mode')
    .to(mode)
    .set('__PUBLIC_URL__')
    .to(minipressConfig.build.base)
    .set('__MINIPRESS_TEMP_DIR__')
    .to(tempDir)
    .end()
  return config
}

function getModulePaths() {
  // @ts-ignore
  return module.paths.concat([path.resolve(process.cwd(), 'node_modules')])
}
