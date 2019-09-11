// @ts-check

module.exports = {
  /** @param {'production' | 'development'} mode */
  setNodeEnv(mode) {
    process.env.NODE_ENV = mode
  }
}
