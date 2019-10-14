// @ts-check
const PLUGIN = '@minipress/plugin-head'

/** @type {import('./types').Plugin} */
module.exports = {
  optionsSchema({ joi }) {
    const HeadConfigSchema = joi.object({
      title: joi.string().optional(),
      description: joi.string().optional(),
      meta: joi.object().default({})
    })
    const HeadFnSchema = joi.function().optional()
    return joi.alternatives([HeadFnSchema, HeadConfigSchema])
  },
  async apply(minipress, options) {
    const { log } = minipress
    minipress.hooks.getHead.tapPromise(PLUGIN, async (head, url, minipress) => {
      if (options == null) {
        log.error(`${PLUGIN}: Options are required.`)
        return
      }
      if (typeof options === 'object') {
        const { title, description, meta = {} } = options
        if (title != null && typeof title === 'string') {
          head.title(title)
        }
        if (description != null && typeof description === 'string') {
          head.description(description)
        }
        for (const metaName in meta) {
          const content = meta[metaName]
          head.meta(metaName, content)
        }
        return
      }
      if(typeof options === 'function') {
        options(head, url, minipress)
      }
    })
  }
}
