// @ts-check
const { join } = require('path')
const CustomContainer = require('@minipress/custom-container')

const PLUGIN = '@minipress/theme-docs'
/** @type {import('./../../plugin').Plugin} */
module.exports = {
  apply(minipress, options) {
    CustomContainer.apply(minipress, {
      type: 'tip',
      defaultTitle: 'TIP',
      renderBefore({ title }) {
        return `<MiniTip title="${title}">\n`
      },
      renderAfter() {
        return '</MiniTip>\n'
      }
    })

    CustomContainer.apply(minipress, {
      type: 'warn',
      defaultTitle: 'WARNING',
      renderBefore({ title }) {
        return `<MiniWarn title="${title}">\n`
      },
      renderAfter() {
        return '</MiniWarn>\n'
      }
    })

    CustomContainer.apply(minipress, {
      type: 'error',
      defaultTitle: 'ERROR',
      renderBefore({ title }) {
        return `<MiniError title="${title}">\n`
      },
      renderAfter() {
        return '</MiniError>\n'
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
      register('MiniFlexItem', 'flex-item.vue')
      register('MiniFlex', 'flex.vue')
      register('MiniTip', 'containers/tip.vue')
      register('MiniWarn', 'containers/warn.vue')
      register('MiniError', 'containers/error.vue')
      // register('HeroLogo', 'logo.vue')
      // register('HeroLogo', 'button.vue')
      // register('LeftBar', 'left-bar.vue')
      // register('LeftBar', 'left-bar.vue')
      // minipress.components.register('default', join(__dirname, 'src', 'components', 'default.vue'))
      // minipress.components.register('hero', join(__dirname, 'src', 'components', 'hero.vue'))
    })
  }
}
