// @ts-check

// * @typedef {import('@minipress/types').File} File
/**
 * @typedef {import('@minipress/types').Page} Page
 * @typedef {import('@minipress/types').ProcessablePage} ProcessablePage
 * @typedef {import('@minipress/types').EmittablePage} EmittablePage
 * @typedef {import('./../minipress/minipress')} Minipress
 * @typedef {import('./../minipress/transformers/transformers')} Transformers
 */

/**
 * @typedef { 'create' | 'remove' | 'change' } Type
 */
// class PageMutation {
//   constructor(type, page) {

//   }
// }

// /** @param {Page} page */
// const CreateMutation = page =>
//   /** @param {Minipress} minipress */
//   async minipress => await minipress.pages.normalizePage(page)

// /** @param {Page} page */
// const RemoveMutation = page =>
//   /** @param {Minipress} minipress */
//   async minipress => await minipress.pages.normalizePage(page)

// /** @param {Page} page */
// const ChangeMutation = page =>
//   /** @param {Minipress} minipress */
//   async minipress => await minipress.pages.normalizePage(page)

module.exports = class Mutations {
  constructor() {
    /** @type {({type: Type, page: Page })[]} */
    this._all = []
  }
  /**
   * @param {Type} type
 * @param {Page} page
 */
  add(type, page) {
    this._all.push({ type, page })
  }

  /** @param {Minipress} minipress */
  async execute(minipress) {
    await Promise.all(this._all.map(mutation => {
      const { type, page } = mutation
      switch (type) {
      case 'create':
      case 'change': {
        return minipress.pages.createPage(page)
      }
      }
      return
    }))
  }
}

// module.exports = {
//   CreateMutation,
//   RemoveMutation,
//   ChangeMutation
// }