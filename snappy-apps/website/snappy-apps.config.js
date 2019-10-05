module.exports = {
  plugins: [
    [require('@minipress/plugin-clean-urls')],
    [require('@minipress/plugin-package-json')],
    [require('@snappy-apps/theme-fiori'), {
      sidenav: {
        items: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'API', link: '/' },
          { text: 'Plugins', link: '/' },
        ]
      },
      productName: {
        prefix: 'Snappy',
        name: 'Apps'
      },
      navbar: {
        items: []
      }
    }]
  ]
}
