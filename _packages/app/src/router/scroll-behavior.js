// @ts-check

export default scrollBus => (to, from, savedPosition) => {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    const fulfill = () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        const hash = decodeURIComponent(to.hash)
        if (document.getElementById(hash.substr(1))) {
          // scroll to anchor by returning the selector
          position = { selector: hash }
        } else {
          // scroll to top if anchor does not exist and position is not already set
          position = position || { x: 0, y: 0 }
        }
      }
      resolve(position)
    }

    // wait for the out transition to complete (if necessary)
    if (to.path === from.path) {
      fulfill()
    } else {
      fulfill()
      // debugger
      // scrollBus.$once('trigger-scroll', fulfill)
      // router.app.$once('trigger-scroll', fulfill)
    }
  })
}
