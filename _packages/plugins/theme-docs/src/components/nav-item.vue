<template>
  <div class="mp-nav__item">
    <MiniLink
      class="mp-nav__item__link"
      :to="link"
      exact-active-class="mp-nav__item__link--active"
      active-class="mp-nav__item__link--active"
    >
      <slot>{{ text }}</slot>
    </MiniLink>
  </div>
</template>

<script>
export default {
  props: {
    exact: Boolean,
    link: {
      type: String
    },
    text: {
      type: String,
      default: () => []
    }
  }
};
</script>

<style lang="stylus">
@require './../styles/_config.stylus'
.mp-nav__item
  flex: 0 0 auto
  margin-left 2rem
  line-height 2.5rem
  a
    line-height 1.4rem
    color inherit
    &.mp-nav__item__link
      color: $navItemLinkColor
      padding-bottom: $navItemLinkUnderlineDistance
      &:hover
        margin-bottom: -($navItemLinkUnderlineWidth)
        border-bottom: $navItemLinkUnderlineWidth solid $navItemLinkUnderlineColor
        padding-bottom: $navItemLinkUnderlineDistance
    &.mp-nav__item__link--active
      margin-bottom: -($navItemLinkUnderlineWidth);
      border-bottom: $navItemLinkUnderlineWidth solid $navItemLinkUnderlineColor
</style>