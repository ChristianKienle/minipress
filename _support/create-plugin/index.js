// @ts-check

const execa = require('execa')
const Path = require('path')
const Process = require('process')
const ora = require('ora')()
const fs = require('fs-extra')
const inquirer = require('inquirer')
const globby = require('globby')

const pluginsPath = Path.join(Process.cwd(), '_packages', 'plugins')
/**
 *
 * @param {string} dir
 */
const getPlugins = async dir => {
  const pkgFiles = await globby('*/package.json', { absolute: true, cwd: dir })
  const pkgs = await Promise.all(pkgFiles.map(path => fs.readJson(path, { encoding: 'utf-8' })))
  console.log(pkgs)
}
const askForName = {
  type: 'input',
  name: 'name',
  message: "Plugin Name",
  async validate(name) {
    const isValid = name != null && name.length >= 1
    await getPlugins(pluginsPath)
    return isValid
    var pass = value.match(
      /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
    );
    if (pass) {
      return true;
    }

    return 'Please enter a valid phone number';
  }
}
;(async () => {
  const answers = await inquirer.prompt([askForName])
  console.log(answers)
})();

