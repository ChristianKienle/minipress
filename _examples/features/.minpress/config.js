// @ts-check
const { join } = require("path")
const docsTheme = require('@minipress/minipress-theme-docs')

module.exports = {
  theme: docsTheme,
  dest: join(__dirname, 'dist'),
  build: {
    base: '/'
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
  },
  pages: join(__dirname, '..', 'pages'),
}
