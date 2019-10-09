// @ts-check
module.exports = {
  theme: ['@minipress/theme-docs', {
    navbar: {
      items: [
        { text: 'Home', link: '/' },
        { text: 'Markdown', link: '/markdown/' },
        { text: 'Routing', link: '/routing/' },
      ]
    }
  }],
  plugins: [
    [require('@minipress/plugin-component-documentation')],
    ['@minipress/plugin-clean-urls', {}],
    [
      '@minipress/plugin-additional-pages',
      () => [
          {
            key: 'helloworld',
            path: '/helloworld/',
            contentType: 'md',
            content: '# helloworld'
          }
        ]
    ]
  ],
  build: {
    base: '/'
  }
}
