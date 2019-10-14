<template>
  <router-link
    class="mp-toc__item__link"
    :class="linkClasses"
    active-class="mp-toc__item__link--active"
    :exact="false"
    :to="to_"
  >
    {{ text }}
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [Object, String],
      default: null
    },
    slug: {
      type: String,
      default: null
    },
    text: String,
    level: Number,
    currentHash: String
  },
  computed: {
    to_() {
      const { to, slug } = this
      return slug != null ? { hash: `#${slug}` } : to
    },
    linkClasses() {
      const { slug, currentHash } = this
      return {
        'mp-toc__item__link--active': `#${slug}` === currentHash
      }
    }
  }
}
</script>
