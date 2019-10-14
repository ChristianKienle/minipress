// @ts-check

const PLUGIN = "<%= name %>"

/** @type {import('./types').Plugin} */
module.exports = {
  async apply(minipress, options) {
    // plugin implementation goes here
  },

  // If you don't want to validate your options
  // delete 'optionsSchema'.
  optionsSchema({ joi }) {
    return joi.any()
  },
}
