const execa = require('execa')
const ghpages = require('gh-pages')
const { resolve } = require('path')
const Process = require('process')
const ora = require('ora')()

;(async () => {
  ora.info(`The following things will happen now:`)
  ora.indent = 4
  ora.info(`– Documentation will be built in production mode`)
  ora.info(`– The built documentation will get published to gh-pages`)
  ora.indent = 0
  ora.info(`Environment:`)
  ora.indent = 4
  const cwd = resolve(Process.cwd(), 'docs')
  const genDir = resolve(cwd, 'public')
  ora.info(`– Documentation: ${cwd}`)
  ora.info(`– Output: ${genDir}`)
  ora.indent = 0
  ora.info(`Lets go…`)
  ora.spinner = 'dots12'
  ora.start(`Building documentation…`)
  const generateProcess = execa('npm', ['run', 'gen'], { cwd })
  try {
    const { stdout } = await generateProcess
    ora.succeed(`Documentation is built! Yay.`)
  } catch(error) {
    ora.fail(`Documentation did not built successfully.`)
    ora.warn(`Error: ${error && error.toString()}`)
  }
  ora.start(`Publishing to gh-pages…`)
  ghpages.publish(genDir, error => {
    if(error != null) {
      ora.fail(`Unable to publish to gh-pages`)
      ora.warn(`Error: ${error && error.toString()}`)
    }
    ora.succeed(`Published!`)
  })
})();
