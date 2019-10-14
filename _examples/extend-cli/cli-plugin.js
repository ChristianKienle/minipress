module.exports = {
  async apply(minipress) {
    minipress.hooks.extendCli.tapPromise('extend-cli-example', async () => {

      const cli = minipress.cli
      console.log('extend cli', minipress.cli)
      cli
      .command('sayHello', 'logs "HELLO!"')
      .action(async () => {
        console.log('HELLO!')
      })

    })
  }
}