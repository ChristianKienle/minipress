// @ts-check
const codeGen = require('@minipress/code-gen')

module.exports = class AppEnhancers {
  /**
   * @param {import('./../minipress')} minipress
   */
  constructor(minipress) {
    this.minipress = minipress
    /** @type {number} */
    this.count = 0
  }

  get currentDynamicModuleName() {
    return this.dynamicModuleNameForIndex(this.count)
  }

  /** @param {number} index */
  dynamicModuleNameForIndex(index) {
    return `minipressinternalappenhancer${index}`
  }

  /** @param {string} code*/
  add(code) {
    const name = this.currentDynamicModuleName
    this.minipress.dynamicModules.register(name, code)
    this.count = this.count + 1
  }

  /** @param {number} index */
  _importAppEnhancerCode(index) {
    const name = this.dynamicModuleNameForIndex(index)
    const dynamicModuleId = `#minipress/dynamic/${name}`
    return codeGen.raw(c => `import ${name} from ${c.stringify(dynamicModuleId)}`)
  }

  /** @param {number} index */
  _executeAppEnhancerCode(index) {
    const name = this.dynamicModuleNameForIndex(index)
    return `${name}({ Vue })`
  }

  get code() {
    const { count } = this
    if(count === 0) {
      return 'export default () => {}'
    }
    /** @type {number[]} */
    const enhancers = Array.from({ length: this.count }).map((_, index) => index)
    return codeGen.raw(() => [
      ...enhancers.map(enhancer => this._importAppEnhancerCode(enhancer)),
      'export default ({ Vue }) => {',
      ...enhancers.map(enhancer => this._executeAppEnhancerCode(enhancer)),
      '}'
    ])
  }

  emit() {
    this.minipress.tempDir.writeTemp('app-enhancers/index.js', this.code)
  }
}
