// @ts-check

const PLUGIN = "@minipress/plugin-alias"

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress, { name, path }) {
    minipress.hooks.registerAliases.tapPromise(PLUGIN, async () => {
      minipress.aliases.register(name, path)
    })
  },
  optionsSchema({ joi }) {
    return joi.object({
      name: joi.string().required(),
      path: joi.string().required()
    }).required()
  }
}
