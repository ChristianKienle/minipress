// @ts-check
const fs = require('fs-extra')
const { join } = require('path')
const Joi = require('@hapi/joi')

const PKG_SCHEMA = Joi.object()

/**
 * @param {string} dir
 * @returns {{value?: Object.<string, any>, error?: Error}}
 */
module.exports = dir => {
  try {
    const path = join(dir, 'package.json')
    const pkg = fs.readJsonSync(path, { encoding: 'utf-8' })
    const { value, error } = PKG_SCHEMA.validate(pkg, { allowUnknown: true })
    if(error != null) {
      return { error }
    }
    if(value == null) {
      return { error: Error('package.json could be read but does not contain anything.') }
    }
    if(typeof value !== 'object') {
      return { error: Error('package.json could be read but does not contain a json object.') }
    }
    return { value }
  } catch(error) {
    return { error: error != null ? error : Error('failed to get package.json') }
  }
}
