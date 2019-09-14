// @ts-check
const codeGen = require('@minipress/code-gen')

/**
 * @typedef {object} Options
 * @prop {string} content
 * @prop {string} pageKey
 * @prop {string=} mixin
 * @prop {string=} topLevelScript
 * @prop {string=} layout
 */

/** @param {Options} options */
module.exports = ({ layout, topLevelScript, mixin, content, pageKey }) => codeGen.vue(c => `
<template>
  <Layout pageKey="${pageKey}"${layout == null ? '' : ` name="${layout}"`}>
    <div class="page-content">${content}</div>
  </Layout>
</template>

<script>
import site from '#minipress/site-data'
${topLevelScript || ''}
export default {
  mixins: [${mixin || ''}],
  computed: {
    page() {
      return (site.pages || []).find(({ key }) => key === ${c.stringify(pageKey)})
    },
    site() {
      return site
    },
    themeConfig() {
      return site.themeConfig
    }
  }
}
</script>
`)
