// @ts-check
const Minipress = require('./../core/minipress')
const Process = require('process')
const log = require('@minipress/log')
const Path = require('path')
const { resolve } = Path
const fs = require('fs')
const Cli = require('@minipress/cli')
const { setNodeEnv } = require('@minipress/utils')
const Config = require('@minipress/config')
const normalizeConfig = Config.normalize.normalizeConfig

const loadConfig = configOptionValue => {
  if (configOptionValue == null) {
    return normalizeConfig()
  }

  const configPath = resolve(configOptionValue)
  if (fs.existsSync(configPath) === false) {
    log.warn(`No configuration found at '${configPath}': File does not exist.`)
    return normalizeConfig()
  }

  try {
    const rawConfig = require(configPath)
    return normalizeConfig (rawConfig)
  } catch(error) {
    log.error(`Unable to load config at '${configPath}' – require(…) threw an error: %O`, error)
    throw error
  }
}

/**
 * @param {import('@minipress/cli')} cli
 */
const addGlobalCliOptions = cli => {
  cli.option('--config <file>', 'specify a config file', {
    'default': resolve(Process.cwd(), 'minipress.config.js')
  })

  cli.option('--mode <mode>', 'spefify mode', {
    'default': 'development'
  })
}

const run = async () => {
  try {
    const cli = new Cli('minipress')
    addGlobalCliOptions(cli)

    const { options } = cli.parse()
    setNodeEnv(options.mode)

    const config = (() => {
      const envPath = Path.join(Path.dirname(options.config), '.env')
      require('dotenv').config({ path: envPath })
      return loadConfig(options.config)
    })()

    const minipress = new Minipress({
      config,
      log,
      cli
    })
    await minipress.preparePlugins()
    cli.help()
    cli.run()
  } catch (error) {
    console.trace(error)
  }
}

module.exports = run
