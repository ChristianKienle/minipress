// @ts-check
const docsTheme = require('@minipress/minipress-theme-docs')
const { resolve } = require('path')
const fs = require('fs')
const pkg = JSON.parse(fs.readFileSync(resolve(__dirname, '..', 'package.json'), 'utf-8'))

module.exports = {
  theme: docsTheme,
  build: {
    base: '/minipress/'
  },
  configureSiteData(site) {
    site.productName = 'miniPress',
    site.homepage = pkg.homepage
  },
  pages: resolve(__dirname, '..', 'pages'),
  themeConfig: {
    navbar: {
      items: [
        { text: 'Guide', link: '/guide/' },
        { text: 'Configuration', link: '/configuration/' },
        { text: 'Themes', link: '/themes/' },
        { text: 'Internals', link: '/internals/' },
        { text: 'Features', link: '/features/' },
        { text: 'GitHub', link: '/404' },
      ]
    }
  }
}
