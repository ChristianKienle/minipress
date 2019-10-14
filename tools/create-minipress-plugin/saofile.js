module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new plugin',
        default: this.outFolder,
        filter: val => val.toLowerCase()
      },
      {
        name: 'description',
        message: 'How would you descripe the new plugin',
        default: `my cool plugin`
      },
      {
        name: 'email',
        message: 'What is your email?',
        default: this.gitUser.email,
        store: true
      },
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**'
    },
    {
      type: 'move',
      patterns: {
        gitignore: '.gitignore'
      }
    }
  ],
  async completed() {
    // this.gitInit()
    // await this.npmInstall()
    this.showProjectTips()
  }
}
