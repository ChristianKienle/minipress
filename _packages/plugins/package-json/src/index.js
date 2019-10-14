// @ts-check
// @ts-ignore
const PLUGIN = require('./../package.json').name
const fs = require('fs-extra')
const Path = require('path')

/** @type {import('./../../plugin').Plugin} */
module.exports = {
  optionsSchema(minipress) {
    const { joi, config } = minipress
    const defaultPath = Path.join(config.cwd, 'package.json')
    return joi.string().default(defaultPath)
  },
  apply(minipress, pkgFile) {
    minipress.hooks.configureSiteData.tapPromise(PLUGIN, async siteData => {
      const { log } = minipress
      const pkg = await fs.readJSON(pkgFile)
      if (pkg == null) {
        log.error(`package.json not found.`)
        return
      }
      if (typeof pkg !== 'object') {
        log.error(`package.json found but is not an object.`)
        return
      }
      log.info(`Found package.json at '${pkgFile}'`)
      siteData.pkg = pkg

      // // const pkgFile = Path.join(dir, 'package.json')
      // // const cwd = minipress.config.cwd
      // let dir = cwd
      // let abort = false
      // while (abort === false) {
      //   const pkgFile = Path.join(dir, 'package.json')
      //   try {
      //     const pkg = fs.readJSON(pkgFile)
      //     // if (exists === false) {
      //     //   dir = Path.join(dir, '..')
      //     //   continue
      //     // }
      //     // await fs.access(pkgFile, fs.constants.R_OK)
      //     // const pkg = await fs.readJSON(pkgFile)
      //     if (pkg == null) {
      //       abort = true
      //       continue
      //     }
      //     if (typeof pkg !== 'object') {
      //       abort = true
      //       continue
      //     }
      //     log.info(`Found package.json at '${pkgFile}'`)
      //     siteData.pkg = pkg
      //   } catch (error) {
      //     abort = true
      //   }
      // }
    })
  }
}
