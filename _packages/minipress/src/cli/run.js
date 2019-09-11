// @ts-check
const Minipress = require('./../minipress/core/minipress')
const Process = require('process')
const { cac } = require('cac')
const { log } = require('@minipress/log')
const { resolve } = require('path')
const fs = require('fs')
const { Config } = require('./../minipress/config')
const installDevCommand = require('./commands/dev')
const installServeCommand = require('./commands/serve')
const installGenerateCommand = require('./commands/generate')

const loadConfig = configOptionValue => {
  if (configOptionValue == null) {
    return Config.fromUserProvidedConfig()
  }

  const configPath = resolve(configOptionValue)
  if (fs.existsSync(configPath) === false) {
    log.error(`No configuration found at '${configPath}': File does not exist.`)
    return Config.fromUserProvidedConfig()
  }
  return Config.fromUserProvidedConfig(require(configPath))
}

const run = async () => {
  try {
    const cli = cac()
    cli.option('--config <file>', 'spefify config', {
      'default': resolve(Process.cwd(), '.minipress', 'config.js')
    })
    cli.option('--mode <mode>', 'spefify mode', {
      'default': 'development'
    })
    const config = (() => {
      const args = cli.parse(Process.argv, { run: false })
      return loadConfig(args.options.config)
    })()
    const minipress = new Minipress({
      config,
      log
    })
    installDevCommand({ minipress, cli })
    installGenerateCommand({ minipress, cli })
    installServeCommand({ minipress, cli })
    cli.parse(Process.argv)
  } catch (error) {
    log.error('Uncaught error:', error)
  }
}

module.exports = run
