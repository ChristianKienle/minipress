// @ts-check
const identity = require('./identity')
/**
 * @typedef {import('./../types').PageTransformer} PageTransformer
 */

/**
 * @param {(PageTransformer[] | PageTransformer | undefined)=} transformers
 * @returns {PageTransformer}
 */
const normalize = transformers => {
  if (transformers == null) {
    return identity
  }
  if (Array.isArray(transformers) === false && transformers != null && typeof transformers === 'function') {
    return transformers
  }
  if (Array.isArray(transformers)) {
    if (transformers.length === 0) {
      return identity
    }
    if (transformers.length === 1 && transformers[0] == undefined) {
      return identity
    }
    return async page => {
      for (const transformer of transformers) {
        await transformer(page)
      }
    }
  }
  return identity
}

module.exports = normalize
