// @ts-check
// @ts-ignore
const PLUGIN = require('./../package.json').name

/** @type {import('./../../plugin').Plugin} */
module.exports = {
  optionsSchema({ joi }) {
    return joi.func().required()
  },
  apply(minipress, generateAdditionalPages) {
    const { joi, log } = minipress
    const fileSchema = joi.object({
      relative: joi.string(),
      absolute: joi.string()
    })
    const headingSchema = joi.object({
      text: joi.string(),
      slug: joi.string(),
      level: joi.number()
    })
    const headingSchuema = joi.array().items(headingSchema)
    const pageSchema = joi.object({
      attributes: joi.object(),
      content: joi.string(),
      contentType: joi.string(),
      file: fileSchema,
      frontmatter: joi.object(),
      headings: headingSchuema,
      key: joi.string(),
      path: joi.string(),
      permalink: joi.string(),
      regularPath: joi.string()
    })
    const resultSchema = joi.array().items(pageSchema)

    minipress.hooks.mutatePages.tapPromise(PLUGIN,
      /**
       * @param {import('./../../../minipress/src/core/minipress/page-mutations')} mutations
       */
      async mutations => {
        const pages = await generateAdditionalPages(minipress)
        const { error, value } = resultSchema.validate(pages)
        if(error) {
          log.error(`${PLUGIN}: Invalid Pages.`, error)
          return
        }
        /**
         * @type {import('@minipress/types').Page[]}
         */
        const validPages = value
        validPages.forEach(page => {
          mutations.add('create', page)
        })
    })
  }
}
