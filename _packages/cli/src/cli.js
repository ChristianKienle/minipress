// @ts-check
const { cac } = require('cac')
const Process = require('process')

module.exports = class Cli {
  constructor(name) {
    this.cac = cac(name)
  }

  /**
   * @param {string} rawName
   * @param {string} description
   * @param {import('cac/types/Option').OptionConfig} options
   */
  option(rawName, description, options) {
    this.cac.option(rawName, description, options)
    return this
  }

  /**
   * @param {string} rawName
   * @param {string} description
   * @param {import('cac/types/Command').CommandConfig} options
   */
  command(rawName, description, options) {
    return this.cac.command(rawName, description, options)
  }
  /**
   * @param {string[]} argv
   */
  parse(argv = Process.argv) {
    return this._parse(argv, { run: false })
  }

  run(argv = Process.argv) {
    return this._parse(argv, { run: true })
  }

  /**
   * @param {string[]} argv
   * @param {{ run: boolean }} options
   */
  _parse(argv, options) {
    return this.cac.parse(argv, options)
  }

  help() {
    this.cac.help()
    return this
  }

  // cli.option('--config <file>', 'specify a config file', {
  //   'default': resolve(Process.cwd(), 'minipress.config.js')
  // })
}