// @ts-check
const WebpackChain = require('webpack-chain')
const Webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const CSSExtractPlugin = require('mini-css-extract-plugin')
const define = require('./../minpress/utils/webpack/define')


/**
 * @typedef {object} Options
 * @prop {boolean} isServer
 * @prop {import('./../minpress/config/config')} minpressConfig
 */

 /** @param {Options} options */
module.exports = function createBase({ isServer, minpressConfig }) {
  // eslint-disable-next-line no-use-before-define
  const modulePaths = getModulePaths()

  const isProd = process.env.NODE_ENV === 'production'
  const mode = isProd ? 'production' : 'development'
  const config = new WebpackChain()
  config.resolve.alias.set('vue$', require.resolve('vue'))
  config.mode(mode).end()
  config.resolveLoader.set('symlinks', true)
  config.resolve.set('symlinks', true)
  config
    .output
    .publicPath(minpressConfig.build.base)
    .path(minpressConfig.dest)
    .filename('assets/js/[name].js')
    .end()

  // config.stats('none').end()
  config.resolveLoader
    .set('symlinks', true)
    .modules
    .merge(modulePaths)

  config.module.rule('vue').test(/\.vue$/)
    .use('vue-loader')
    .loader('vue-loader')
    .options({
      extractCSS: isProd
    })
    .end()
  config.module.rule('js').test(/\.js$/).exclude.add(/node_modules/).add(/\.vue\.js/)
    .end()

  config.module.rule('js').use('babel-loader')
    .loader('babel-loader')
    .options({
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
    .end()


  // const ownModulesDir = path.dirname(require.resolve('@minpress/built-in-components'));

  config.resolve.modules.add('node_modules')
  // .add(ownModulesDir)


  function createCSSRule(lang, test, loader, options) {
    const baseRule = config.module.rule(lang).test(test)
    const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/)
    const normalRule = baseRule.oneOf('normal')

    function applyLoaders(rule, /* modules */) {
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

    applyLoaders(modulesRule, true)
    applyLoaders(normalRule, false)
  }

  const scssOptions = {}
  const sassOptions = {}
  const lessOptions = {}
  const stylusOptions = {}
  createCSSRule('css', /\.css$/)
  createCSSRule('postcss', /\.p(ost)?css$/, 'postcss-loader',
    {
      plugins: [
        // require('postcss-import'),
        // require('tailwindcss'),
        require('autoprefixer')
      ]
    })
  createCSSRule('scss', /\.scss$/, 'sass-loader', scssOptions)
  createCSSRule('sass', /\.sass$/, 'sass-loader', Object.assign({ indentedSyntax: true }, sassOptions))
  // createCSSRule('less', /\.less$/, 'less-loader', lessOptions)
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

  config.plugin('vue').use(VueLoaderPlugin)
    .end()
  config.plugin('define').use(Webpack.DefinePlugin, [{}])
    .end()

  define(config)
    .set('process.env.NODE_ENV')
    .to(mode)
    .set('process.server')
    .to(isServer)
    .set('process.client')
    .to(!isServer)
    .set('process.minpress.mode')
    .to(mode)
    .set('__PUBLIC_URL__')
    .to(minpressConfig.build.base)
    .end()
  return config
}

function getModulePaths() {
  // @ts-ignore
  return module.paths.concat([path.resolve(process.cwd(), 'node_modules')])
}
