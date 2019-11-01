// @ts-check
const { join } = require('path')
const PLUGIN = '@minipress/docs'
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const themeConfig = {
  navbar: {
    items: [
      { text: 'Guide', link: '/guide' },
      { text: 'Configuration', link: '/configuration' },
      { text: 'Features', link: '/features' },
      { text: 'Plugins', link: '/plugins-and-themes/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'GitHub', link: 'https://github.com/ChristianKienle/minipress' },
    ]
  }
}

/**
 * @param {import('@minipress/head-element')} head
 * @param {string} url
 * @param {import('@minipress/types').MinipressI} minipress
 */
const headFn = (head, url, minipress) => {
  /** @param {string} relativePath */
  const withBase = relativePath => `${minipress.config.build.base}${relativePath}`
  head
    .link({ rel: 'shortcut icon', href: withBase('favicon.ico') })
    .link({ rel: 'apple-touch-icon', sizes: '180x180', href: withBase('apple-touch-icon.png') })
    .link({ type: 'image/png', sizes: '32x32', href: withBase('favicon-32x32.png') })
    .link({ type: 'image/png', sizes: '16x16', href: withBase('favicon-16x16.png') })
    .link({ rel: 'manifest', href: withBase('site.webmanifest') })
    .meta('msapplication-TileColor', '#da532c')
    .meta('msapplication-config', withBase('browserconfig.xml'))
    .meta('theme-color', '#ffffff')
    .title('miniPress')
    .description('miniPress – static site generator')
}

module.exports = {
  plugins: [
    '@minipress/plugin-serve-static',
    ['@minipress/theme-docs', themeConfig],
    '@minipress/plugin-component-demo',
    '@minipress/plugin-summary-container',
    '@minipress/plugin-blog',
    '@minipress/plugin-component-documentation',
    '@minipress/plugin-deploy-to-gh-pages',
    ['@minipress/plugin-head', headFn],
    '@minipress/plugin-last-modified',
    '@minipress/plugin-clean-urls',
    '@minipress/plugin-package-json'
  ],
  /** @param {import('@minipress/minipress/src/core/minipress/minipress')} minipress */
  apply(minipress) {
    minipress.hooks.chainWebpack.tapPromise(PLUGIN, async (config, type) => {
      if(type === 'client') {
        config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin)
        .tap(() => [{
          reportFilename: `client.html`,
          analyzerMode: 'static',
          openAnalyzer: false
        }])
        .end()
      }
    })

    minipress.hooks.registerGlobalComponents.tapPromise(PLUGIN, async () => {
      minipress.globalComponents.register('DocsGlobalStyles', join(__dirname, 'styles', 'global.vue'))
    })

    minipress.hooks.registerComponents.tapPromise(PLUGIN, async components => {
      components.register('MpSampleButton', join(__dirname, 'components', 'mp-sample-button.vue'))
    })
  }
}
