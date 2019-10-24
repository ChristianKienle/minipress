// @ts-check
/**
 * @typedef {import('@minipress/types').ConfigPlugin} ConfigPlugin
 * @typedef {import('@minipress/types')._ConfigPlugin} _ConfigPlugin
 * @typedef {import('@minipress/types').Plugin} ResolvedPlugin
 * @typedef {import('@minipress/types').ConfigExecutablePlugin} ConfigExecutablePlugin
 */
const { dirname } = require('path')
const nanoid = require('nanoid')

/** @param {string} id */
const isRelative = id => id.startsWith('.')

/**
 * @param {string=} [name='']
 * @returns {string}
 */
const sealName = (name = '') => name.length > 0 ? name : `anonymous-minipress-plugin-${nanoid()}`

/**
 * @param {{id: string, options: any}} plugin
 * @returns {ConfigExecutablePlugin}
 */
const resolvePlugin = ({ id, options }) => {
  try {
    delete require.cache['@minipress/minipress/package.json']
    const resolveMinipressPkgPath = () => require.resolve('@minipress/minipress/package.json', { paths: [process.cwd()] })
    // module.parent is the module that required this very module.
    // This means – if some module tries to use resolvePlugin(…) our module.parent (below)
    // points to the module that 'id' is relative to.
    // @ts-ignore
    const paths = isRelative(id)
      // @ts-ignore
      ? [dirname(module.parent.filename)]
      : [
        process.cwd(),
        dirname(resolveMinipressPkgPath())
      ]
    delete require.cache[id]
    const path = require.resolve(id, { paths })
    delete require.cache[path]
    const resolved = require(path)
    if (resolved == null || typeof resolved !== 'object') {
      throw Error(`Plugin ${id} could be resolved but it does not export anything. A plugin should export an object with an apply function.`)
    }
    return makeExecutable(resolved, options)
  } catch (error) {
    throw Error(`Failed to resolve plugin ${id}'): ${error}`)
  }
}

/**
 * @param {ConfigPlugin} pluginFromConfig
 * @returns {ConfigExecutablePlugin}
 */
const normalizePlugin = pluginFromConfig => {
  const _pluginFromConfig = _normalizePlugin(pluginFromConfig)
  if (pluginFromConfig == null) {
    throw Error('plugin cannot be null/undefined')
  }

  const [plugin, options] = _pluginFromConfig
  if (typeof plugin === 'string') {
    return resolvePlugin({
      id: plugin,
      options
    })
  } else {
    return makeExecutable(plugin, options)
  }
}

/**
 * @param {ConfigPlugin} pluginFromConfig
 * @returns {_ConfigPlugin}
 */
const _normalizePlugin = pluginFromConfig => {
  if (pluginFromConfig == null) {
    throw Error('plugin cannot be null/undefined')
  }

  if (Array.isArray(pluginFromConfig)) {
    if (pluginFromConfig.length === 0) {
      throw Error('invalid plugin: expected a module name or resolved module')
    }
    const [plugin, options] = pluginFromConfig
    if (typeof plugin === 'string' || typeof plugin === 'object') {
      return [plugin, options]
    } else {
      throw Error('plugin should be a string (module) or an object')
    }
  }
  return [pluginFromConfig]
}

/**
 * @param {ConfigPlugin[]} [plugins=[]]
 * @returns {ConfigPlugin[]}
 */
const normalizePlugins = (plugins = []) => plugins.map(normalizePlugin)

/**
 * @param {ResolvedPlugin} plugin
 * @param {any=} options
 * @returns {ConfigExecutablePlugin}
 */
const makeExecutable = (plugin, options) => {
  const {
    name = sealName(plugin.name),
    apply,
    optionsSchema
  } = plugin
  if (apply == null || typeof apply !== 'function') {
    throw Error(`Plugin ${name} could be sealed because it does not have an apply function.`)
  }

  /**
   * @param {import('@minipress/types').MinipressI} minipress
   * @returns {import('@hapi/joi').Schema}
   */
  let _optionsSchema = minipress => minipress.joi.any()
  if (optionsSchema != null) {
    if (typeof optionsSchema !== 'function') {
      throw Error(`Plugin ${name} defines an optionsSchema but it is not a function.`)
    }
    _optionsSchema = optionsSchema
  }

  const createValidator = minipress => () => {
    const schema = _optionsSchema(minipress)
    const { error, value } = schema.validate(options)
    if (error != null) {
      throw Error(`Options for plugin '${name}' invalid: ${error.message}`)
    }
    return value
  }

  return {
    name,
    options,
    apply: async minipress => {
      const validator = createValidator(minipress)
      const validOptions = validator()
      apply(minipress, validOptions)
    }
  }
}

module.exports = { resolvePlugin, normalizePlugin, normalizePlugins }
