// @ts-check
const { join } = require('path')
const CustomContainer = require('@minipress/custom-container')

const PLUGIN = '@minipress/theme-docs'
/** @type {import('./../../plugin').Plugin} */
module.exports = {
  optionsSchema({ joi }) {
    const defaultLogo = {
      text: {
        prefix: 'mini',
        suffix: 'Press'
      }
    }
    const logoSchema = joi.alternatives().try(
      joi.string().default('miniPress'),
      joi.object({
        text: joi.object({
          prefix: joi.string().default('mini').required(),
          suffix: joi.string().default('Press').required()
        })
      })
    ).default(defaultLogo)

    return joi.object({
      logo: logoSchema,
      navbar: joi.object({
        items: joi.array().items(joi.object({
          text: joi.string().default('text undefined'),
          link: joi.string().default('/')
        })).default([])
      })
    }).default({
      navbar: { items: [] },
      logo: defaultLogo
    })
  },

  async apply(minipress, options) {
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

    CustomContainer.apply(minipress, {
      type: 'info',
      defaultTitle: '',
      renderBefore() {
        return `<MiniInfo>\n`
      },
      renderAfter() {
        return '</MiniInfo>\n'
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
       * @param {string} id
       * @param {string} relativePath
       */
      const register = (id, relativePath) => {
        const path = join(root, relativePath)
        minipress.components.register(id, path)
      }
      register('MiniFlexItem', 'flex-item.vue')
      register('MpMain', 'main.vue')
      register('MiniFlex', 'flex.vue')
      register('MiniTip', 'containers/tip.vue')
      register('MiniInfo', 'containers/info.vue')
      register('MiniWarn', 'containers/warn.vue')
      register('MiniError', 'containers/error.vue')
    })
  }
}
