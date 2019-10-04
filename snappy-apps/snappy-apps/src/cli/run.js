// @ts-check
const { Minipress, normalizeConfig } = require('@minipress/minipress')
const Process = require('process')
const { cac } = require('cac')
const log = require('@minipress/log')
const Path = require('path')
const { resolve } = Path
const fs = require('fs')
const installDevCommand = require('./commands/dev')
const installServeCommand = require('./commands/serve')
const installGenerateCommand = require('./commands/generate')

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

const run = async () => {
  try {
    const cli = cac()
    cli.option('--config <file>', 'specify a config file', {
      'default': resolve(Process.cwd(), 'snappy-apps.config.js')
    })
    cli.option('--mode <mode>', 'spefify mode', {
      'default': 'development'
    })
    const config = (() => {
      const { options } = cli.parse(Process.argv, { run: false })
      const { config } = options
      const envPath = Path.join(Path.dirname(config), '.env')
      require('dotenv').config({ path: envPath })
      return loadConfig(config)
    })()
    const minipress = new Minipress({
      config,
      log
    })
    installDevCommand({ minipress, cli })
    installGenerateCommand({ minipress, cli })
    installServeCommand({ minipress, cli })
    cli.help()
    cli.parse(Process.argv)
  } catch (error) {
    console.trace(error)
  }
}

module.exports = run
