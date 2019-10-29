<template>
  <MiniContent :pageKey="excerptPageKey" />
</template>

<script>
// @ts-nocheck
export default {
  props: {
    ofPageWithKey: {
      type: String,
      default: null
    }
  },
  computed: {
    currentPageKey() {
      return this.$minipress.page.key
    },
    excerptPageKey() {
      return `Excerpt--${this.ofPageWithKey_}`
    },
    ofPageWithKey_() {
      return this.ofPageWithKey != null ? this.ofPageWithKey : this.currentPageKey
    }
  }
}
</script>
