<template>
  <router-link
    class="mp-toc__item__link"
    :class="linkClasses"
    :to="{ hash: slug }"
  >
    {{ text }}
  </router-link>
</template>

<script>
export default {
  props: {
    slug: String,
    text: String,
    level: Number,
    currentHash: String
  },
  computed: {
    linkClasses() {
      const { slug, currentHash } = this
      return {
        'mp-toc__item__link--active': `#${slug}` === currentHash
      }
    }
  }
}
</script>
