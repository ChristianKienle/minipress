// @ts-check

/**
 * @typedef {import('./../minipress')} Minipress
 * @typedef {object} Options
 * @prop {Minipress} minipress
 */

/**
 * @param {any=} options
 * @returns {[null | Options, null | Error]}
 */
const normalize = options => {
  if (options == null) {
    return [null, Error('options of page-loader cannot be undefined.')]
  }
  if (typeof options !== 'object') {
    return [null, Error('options of page-loader must be a valid options-object.')]
  }
  const { minipress } = options
  if (minipress == null) {
    return [null, Error('options of page-loader do not contain \'minipress\' property.')]
  }
  return [options, null]
}

module.exports = normalize
