// @ts-check
module.exports = class Node {
  static get IS_EMPTY() { return true }
  static get IS_NOT_EMPTY() { return false }

  /**
   * @param {string} tag
   * @param {Object.<string, string>} attrs
   * @param {boolean} isEmpty If true then the element is rendered without a closing tag
   * @param {string} contentOrChildren
   */
  constructor(tag, attrs, isEmpty, contentOrChildren) {
    this.tag = tag
    this.attrs = attrs
    this.isEmpty = isEmpty
    this.contentOrChildren = contentOrChildren || ''
  }

  toString() {
    const attrs = Object.entries(this.attrs)
    const hasAttrs = attrs.length > 0
    const attrsPrefix = hasAttrs ? ' ' : ''
    const asString = attrs.map(([name, value]) => {
      if(value == null) {
        return name
      }
      if(value.length === 0) {
        return name
      }
      return `${name}="${value}"`
    }).join(' ')
    const { tag, isEmpty } = this
    return `<${tag}${attrsPrefix}${asString}>${this.contentOrChildren}${isEmpty ? '' : `</${tag}>`}`
  }
}