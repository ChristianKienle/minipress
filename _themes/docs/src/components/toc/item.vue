<template>
  <div
    class="mp-toc__item"
    :data-toc-item-level="level"
    :class="classes"
  >
    <slot />
  </div>
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
    classes() {
      return {
        'text-base': this.level == 2,
        'text-sm': this.level > 2
      }
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

<style lang="stylus">
@require './../../styles/_config.stylus'

.mp-toc__item
  font-size 1rem
  padding-top 0.35rem
  padding-bottom 0.35rem
  a.mp-toc__item__link
    font-weight 400
    color #222
    &:active
    &:hover
      color $accentColor
    &--active
      font-weight 600
      color $accentColor

.mp-toc__item[data-toc-item-level="1"]
  margin-left 0
  font-size 1.1rem
  font-weight 700
  margin-block-end 25px

.mp-toc__item[data-toc-item-level="2"]
  margin-left: 0
  font-size 1rem

.mp-toc__item[data-toc-item-level="3"]
  margin-left: 20px;
  font-size 0.9rem

.mp-toc__item[data-toc-item-level="4"]
  margin-left: 30px;

.mp-toc__item[data-toc-item-level="5"]
  margin-left: 40px;

.mp-toc__item[data-toc-item-level="6"]
  margin-left: 50px;

</style>