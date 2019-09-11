// @ts-check
const { join } = require("path")
const docsTheme = require('@minpress/minpress-theme-docs')

module.exports = {
  theme: docsTheme,
  dest: join(__dirname, 'dist'),
  build: {
    base: '/'
    // publicUrl: '/minpress/dist/'
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
