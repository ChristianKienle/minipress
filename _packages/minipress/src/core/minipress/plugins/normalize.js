// @ts-check
/**
 * @typedef {import('./types').Plugin} Plugin
 * @typedef {import('./types')._Plugin} _Plugin
 * @typedef {import('./types')._ResolvedPlugin} _ResolvedPlugin
 */
const { dirname } = require('path')

/** @param {string} id */
const isRelative = id => id.startsWith('.')

/**
 * @param {_Plugin} plugin
 * @returns {_ResolvedPlugin}
 */
const resolvePlugin = ({ id, options }) => {
  try {
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
    const path = require.resolve(id, { paths })
    const resolved = require(path)
    if (resolved == null || typeof resolved !== 'object') {
      throw Error(`Plugin ${id} could be resolved but it does not export anything. A plugin should export an object with an apply function.`)
    }

    const { apply, optionsSchema } = resolved
    if (apply == null || typeof apply !== 'function') {
      throw Error(`Plugin ${id} could be resolved but it does not an apply function.`)
    }

    /** @param {import('./../../minipress/minipress')} minipress */
    let _optionsSchema = minipress => minipress.joi.any()
    if (optionsSchema != null) {
      if (typeof optionsSchema !== 'function') {
        throw Error(`Plugin ${id} defines an optionsSchema but it is not a function.`)
      }
      _optionsSchema = optionsSchema
    }

    const createValidator = minipress => () => {
      const schema = _optionsSchema(minipress)
      const { error, value } = schema.validate(options)
      if (error != null) {
        throw Error(`Options for plugin '${id}' invalid: ${error.message}`)
      }
      return value
    }

    return {
      options,
      apply: async minipress => {
        const validator = createValidator(minipress)
        const validOptions = validator()
        apply(minipress, validOptions)
      },
      entryPointPath: path
    }
  } catch (error) {
    throw Error(`Failed to resolve plugin ${id}'): ${error}`)
  }
}

/**
 * @param {Plugin} plugin
 * @returns {_ResolvedPlugin}
 */
const normalizePlugin = plugin => {
  if (plugin.length === 0) {
    throw Error('plugin invalid')
  }
  const [rawPlugin, options] = plugin
  if (rawPlugin == null) {
    throw Error('invalid plugin')
  }
  const normalized = {
    id: rawPlugin,
    options
  }
  return resolvePlugin(normalized)
}

/**
 * @param {import('./types').Plugins} [plugins=[]]
 * @returns {_ResolvedPlugin[]}
 */
const normalizePlugins = (plugins = []) => plugins.map(normalizePlugin)

module.exports = { resolvePlugin, normalizePlugin, normalizePlugins }
