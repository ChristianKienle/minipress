// @ts-check
const PLUGIN = '@minipress/plugin-head'

module.exports = {
  // optionsSchema(minipress) {

  // },
 /**
  * @type {import('./../../plugin').Plugin}
  */
  async apply(minipress, options) {
    const { log } = minipress
    minipress.hooks.getHead.tapPromise(PLUGIN, async (head, page) => {
      if(options == null) {
        log.error(`${PLUGIN}: Options are required.`)
        return
      }
      if(typeof options !== 'object') {
        log.error(`${PLUGIN}: Options must be an Object.`)
        return
      }
      const { title, description, meta = {} } = options
      if(title != null && typeof title === 'string') {
        head.title(title)
      }
      if(description != null && typeof description === 'string') {
        head.description(description)
      }
      for(const metaName in meta) {
        const content = meta[metaName]
        head.meta(metaName, content)
      }
    })
  }
}
