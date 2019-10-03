<template>
  <div class="mp-toc__item" :class="classes">
    <div class="mp-toc__item-content" :data-toc-item-level="level">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    level: Number
  },
  computed: {
    classes() {
      return this.isActive ? "mp-toc__item--active" : "";
    }
  }
};
</script>

<style lang="stylus">
@require './../../styles/_config.stylus'
$item-background-color = #e9fafa
$item-active-edge = darken(#b6edef, 20%)
.mp-toc__item
  font-size 1rem
  padding-top 4px
  padding-bottom 4px
  border-left 6px solid transparent
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &--active
    border-left 6px solid $item-active-edge
    background-color $item-background-color
  &-content
    padding-left $sideNavItemPadding
    padding-right $sideNavItemPadding
    &[data-toc-item-level="1"]
      margin-left 0
      font-size 1.2rem
      font-weight 700
      margin-block-end 25px
    &[data-toc-item-level="2"]
      margin-left 0
      font-size 1.1rem
      font-weight 600
    &[data-toc-item-level="3"]
      margin-left 0
      font-size 0.9rem
    &[data-toc-item-level="4"]
      margin-left 10px
      font-size 0.8rem
    &[data-toc-item-level="5"]
      margin-left 10px
      font-size 0.8rem
    &[data-toc-item-level="6"]
      margin-left 10px
      font-size 0.8rem
    a.mp-toc__item__link
      display inline-block
      font-weight: inherit
      color #222
      &:active
      &:hover
        color saturation(darken($accentColor, 20%), 80%)
      &--active
        font-weight 700
        color saturation(darken($accentColor, 20%), 80%)
</style>