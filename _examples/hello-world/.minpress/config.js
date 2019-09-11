// @ts-check
const { resolve } = require("path")

module.exports = {
  pages: resolve(process.cwd(), "pages"),
  // layouts: {
  //   custom: resolve(__dirname, "layouts", "custom.vue")
  // },
  // navbar: {
  //   items: [
  //     { text: 'Home', link: '/' },
  //     { text: 'About', link: '/about/' },
  //     { text: 'Markdown', link: '/markdown/' },
  //     { text: 'Headings', link: '/headings/' },
  //     { text: 'Custom Layout', link: '/custom/' },
  //   ]
  // }
}
