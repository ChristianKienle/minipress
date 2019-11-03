// @ts-check

const ID = '@minipress/log-errors-webpack-plugin'

class LogErrorsPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(ID, stats => {
      if(stats.hasErrors()) {
        const { compilation } = stats
        const { errors = [] } = compilation
        errors.forEach(error => {
          console.error(error.toString())
        })
      }
    })
  }
}

module.exports = LogErrorsPlugin