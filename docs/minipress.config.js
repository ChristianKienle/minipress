// @ts-check

const themeConfig = {
  navbar: {
    items: [
      { text: 'Guide', link: '/guide' },
      { text: 'Configuration', link: '/configuration' },
      { text: 'Features', link: '/features' },
      { text: 'Plugins & Themes', link: '/plugins-and-themes/' },
    ]
  }
}

const head = {
  title: 'miniPress',
  description: 'Build Static Sites – super easy.'
}

module.exports = {
  plugins: [
    ['@minipress/theme-docs', themeConfig],
    ['@minipress/plugin-summary-container'],
    [require('@minipress/plugin-component-documentation')],
    [require('@minipress/plugin-deploy-to-gh-pages')],
    ['@minipress/plugin-head', head],
    ['@minipress/plugin-last-modified'],
    ['@minipress/plugin-clean-urls'],
    ['@minipress/plugin-package-json']
  ],
  /** @param {import('@minipress/minipress/src/core/minipress/minipress')} minipress */
  apply(minipress) {}
}
