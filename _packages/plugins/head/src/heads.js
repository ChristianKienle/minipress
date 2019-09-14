// @ts-check
const normalizeHead = require('./head')
/**
 * @param {import('./types').Head[]} [heads=[]]
 * @returns {import('./types')._Head}
 */
module.exports = (heads = []) => {
  const _heads = heads.map(normalizeHead)
  /**
   * @param {any} page
   */
  return page => {
    let head = normalizeHead()(page)
    _heads.forEach(_head => {
      head = {
        ...head,
        ..._head(page)
      }
    })
    return head
  }
}
