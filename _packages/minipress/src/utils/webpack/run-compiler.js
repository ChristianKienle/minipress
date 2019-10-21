// @ts-check

/** @param {import('webpack').Compiler} compiler */
module.exports = compiler => new Promise((resolve, reject) => {
  compiler.run((err, stats) => {
    if (err) {
      return reject(err)
    }
    resolve(stats)
  })
})
