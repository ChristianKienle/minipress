<template>
  <div
    class="mp-toc__item"
    :data-toc-item-level="level"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    level: Number
  }
}
</script>

<style lang="stylus">
@require './../../styles/_config.stylus'
.mp-toc__item
  padding-left $sideNavItemPadding
  padding-right $sideNavItemPadding
  font-size 1rem
  padding-top 0
  padding-bottom 0
  a.mp-toc__item__link
    font-weight: inherit
    color #222
    &:active
    &:hover
      color saturation(darken($accentColor, 20%), 80%)
    &--active
      font-weight 700
      color saturation(darken($accentColor, 20%), 80%)
.mp-toc__item
  &[data-toc-item-level="1"]
    margin-left 0
    font-size 1.2rem
    font-weight 700
    margin-block-end 25px
  &[data-toc-item-level="2"]
    margin-left 0
    font-size 1.1rem
    font-weight 600
    margin-block-end 0.3rem
    margin-block-start 1rem
  &[data-toc-item-level="3"]
    margin-block-end 0.3rem
    margin-left 0
    font-size 0.9rem
  &[data-toc-item-level="4"]
    margin-block-end 0.3rem
    margin-left 10px
    font-size 0.8rem
  &[data-toc-item-level="5"]
    margin-block-end 0.3rem
    margin-left 10px
    font-size 0.8rem
  &[data-toc-item-level="6"]
    margin-block-end 0.3rem
    margin-left 10px
    font-size 0.8rem
</style>