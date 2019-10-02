// @ts-check
const { join } = require('path')
const PLUGIN = '@minipress/theme-docs'
/** @type {import('./../../plugin').Plugin} */
module.exports = {
  apply(minipress, options) {

    minipress.use('@minipress/custom-container', {
      type: 'tip',
      defaultTitle: 'TIP',
      renderBefore() {
        return '<div>\n'
      },
      renderAfter() {
        return '</div>\n'
      }
    })

    minipress.hooks.configureSiteData.tapPromise(PLUGIN, async siteData => {
      siteData.themeConfig = { ...options }
    })
    minipress.hooks.registerLayouts.tapPromise(PLUGIN, async () => {
      minipress.layouts.register('default', join(__dirname, 'layouts', 'default.vue'))
      minipress.layouts.register('hero', join(__dirname, 'layouts', 'hero.vue'))
    })
    minipress.hooks.registerComponents.tapPromise(PLUGIN, async () => {
      const root = join(__dirname, 'components')
      /**
       *
       * @param {string} id
       * @param {string} relativePath
       */
      const register = (id, relativePath) => {
        const path = join(root, relativePath)
        minipress.components.register(id, path)
      }
      // register('BurgerIcon', 'burger-item.vue')
      register('FlexItem', 'flex-item.vue')
      register('Flex', 'flex.vue')
      register('MiniTip', 'tip.vue')
      // register('HeroLogo', 'logo.vue')
      // register('HeroLogo', 'button.vue')
      // register('LeftBar', 'left-bar.vue')
      // register('LeftBar', 'left-bar.vue')
      // minipress.components.register('default', join(__dirname, 'src', 'components', 'default.vue'))
      // minipress.components.register('hero', join(__dirname, 'src', 'components', 'hero.vue'))
    })
  }
}
