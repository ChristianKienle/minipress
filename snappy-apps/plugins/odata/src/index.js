const ID = require('./../package.json').name
const { join } = require('path')
const odata = require('o.js')

;(async () => {
  const o = odata.o
  const request = await o('https://services.odata.org/V3/OData/OData.svc/').get('Products').query({$format: 'json'})

  console.log(request)
  // .then(data => {
  // });
})()

module.exports = {
  // optionsSchema({joi}) {

  // },

  apply(minipress, options) {


    minipress.hooks.registerAliases.tapPromise(ID, async config => {
      minipress.aliases.register('odata', require.resolve('o.js/dist/umd/o.js'))
    })

    minipress.hooks.registerAppEnhancers.tapPromise(ID, async () => {
      minipress.appEnhancers.add(`
        import * as odata from 'odata'
        export default ({ Vue }) => {
          Vue.prototype.$odata = odata
          console.log('odata',odata)
          console.log('odata', Vue.prototype.$odata)
        }
        `
      )
    })
  }
}
