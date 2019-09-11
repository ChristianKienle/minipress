// @ts-check
const docsTheme = require('@minipress/minipress-theme-docs')

module.exports = {
  theme: docsTheme,
  build: {
    base: '/minipress/'
  },
  configureSiteData(site) {
    site.productName = 'miniPress'
  },
  themeConfig: {
    navbar: {
      items: [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' },
        { text: 'Themes', link: '/themes/' },
        { text: 'GitHub', link: '/404' },
      ]
    }
  }
}
