// @ts-check

/**
 * @param {import('./create-app-types').Component} component
 * @returns {Promise<string>}
 */
export const getLayoutFromComponent = async component => {
  if (typeof component === 'function') {
    try {
      const resolveComponentModule = await component()
      return getLayoutFromComponent(resolveComponentModule)
    } catch (error) {
      console.trace('Failed to resolve page component', error)
      return 'default'
    }
  }

  const { layout = 'default' } = component
  return layout
}


/** @param {import('vue-router').default} router */
export const getCurrentLayout = async router => {
  const [PageComponent] = router.getMatchedComponents()
  if (PageComponent == null) {
    return 'default'
  }
  return await getLayoutFromComponent(PageComponent)
}


