// @ts-check
const chalk = require("chalk").default;
const ora = require('ora')
const assert = require('assert').strict

/** @typedef {"debug" | "info" | "warn" | "error"} Level */
/** @typedef {ora.PersistOptions} PersistOptions */

const prefix = " minipress ";
const _log = message => console.log;

class Logger {
  constructor() {
    this._ora = ora()
  }
  debug(message, ...params) { console.log(`${chalk.bgMagenta(prefix)} ${message}`, ...params) }

  info(message) {
    this._ora.info(chalk.dim(message))
  }

  /** @param {PersistOptions} options */
  stopAndPersist(options) {
    this._ora.stopAndPersist(options)
  }

  success(message) {
    this._ora.succeed(chalk.dim(`${message}`))
  }

  warn(message, ...params) { console.log(`${chalk.bgYellow(prefix)} ${message}`, ...params) }

  /**
   * @param {string} message
   * @param  {Error} error
   */
  error(message, error) {
    this._ora.fail(`${chalk.dim(message)} ${chalk.reset(error.message)}`)
  }

  /** @param {string=} text */
  actionSucceed(text) {
    assert(this._ora.isSpinning)
    this._ora.succeed(text)
  }

  /** @param {string=} text */
  actionFailed(text) {
    assert(this._ora.isSpinning)
    this._ora.fail(text)
  }

  /** @param {string=} text */
  action(text) {
    assert(this._ora.isSpinning === false)
    this._ora.start(text)
  }
}

module.exports = Logger;
