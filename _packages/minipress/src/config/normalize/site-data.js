// @ts-check

/**
 * @param {import('./../types').SiteDataConfigurator=} configureSiteData
 * @returns {import('./../types')._SiteDataConfigurator}
 */
module.exports = configureSiteData => {
  if (configureSiteData == null) {
    return (site => Promise.resolve(site))
  }
  return async site => {
    const resultingSite = await configureSiteData(site)
    if (resultingSite == null) {
      return site
    }
    return resultingSite
  }
}
