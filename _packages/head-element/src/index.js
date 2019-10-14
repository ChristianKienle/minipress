// @ts-check

const Node = require('./node')
const { EOL } = require('os')
/** @type {(title: string) => string}} */
const Title = title => `<title>${title}</title>`

/** @type {(name: string, content: string) => string}} */
const Meta = (name, content) => `<meta name="${name}" content="${content}">`

module.exports = class Head {
  constructor() {
    this._title = null
    /** @type {Map<string, Node>} */
    this._meta = new Map() // maps meta-name to Node
    /** @type {Node[]} */
    this._nodes = [] // other random nodes of all kind
  }

  /** @param {string} title */
  title(title) {
    this._title = title
    return this
  }

  get titleNode() {
    return new Node('title', {}, Node.IS_NOT_EMPTY, this._title || '')
  }

  /** @param {string} content */
  description(content) {
    return this.meta('Description', content)
  }

  /**
   * @param {string} name
   * @param {string} content
   */
  meta(name, content) {
    this._meta.set(name, new Node('meta', { name, content }, Node.IS_EMPTY, ''))
    return this
  }

  /**
   * @param {Node} node
   */
  add(node) {
    this._nodes.push(node)
    return this
  }

  /**
   * @param {Object.<string, string>} attrs
   */
  link(attrs) {
    const node = new Node('link', attrs, Node.IS_EMPTY, '')
    return this.add(node)
  }

  renderToString() {
    const metaNodes = Array.from(this._meta.values())
    const { titleNode, _nodes } = this
    const allNodes = [
      titleNode,
      ..._nodes,
      ...metaNodes,
    ]
    return allNodes.map(node => node.toString()).join(EOL).trim()
  }
}
