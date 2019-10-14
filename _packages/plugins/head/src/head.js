// @ts-check
/**
 * @param {import('./types').Head} [head={}]
 * @returns {import('./types')._Head}
 */
module.exports = (head = {}) => {
  const {
    title = 'miniPress',
    description = 'My miniPress Website',
    meta = {}
  } = head
  return _ => ({
    title,
    description,
    meta
  })
}
