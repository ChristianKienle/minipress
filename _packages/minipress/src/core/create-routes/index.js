// @ts-check
const Route = require('./route')
const codeGen = require('@minipress/code-gen')

/** @param {import('@minipress/types').EmittablePage[]} pages */
module.exports = pages => {
  const pagesWithPaths = pages.filter(page => page.path != null && page.file.absolute != null)
  const routes = pagesWithPaths.map(page => new Route({
    // @ts-ignore
    componentPath: page.file.absolute,
    // @ts-ignore
    path: page.path,
    meta: {
      $type: 'page',
      $page: {
        key: page.key,
        relativePath: page.file.relative || ''
      }
    }
  }))
  return {
    routes,
    get code() {
      return codeGen.js(() => [
        'export default [',
        routes.map(route => route.routeCode()).join(', '),
        ']'
      ])
    }
  }
}
