module.exports = {
  async apply(minipress) {
    const code = `
    import MyLib from '@minipress/example-my-component-library'
    export default ({ Vue }) => {
      Vue.use(MyLib)
    }
    `
    minipress.addAppEnhancer(code)
  }
}
