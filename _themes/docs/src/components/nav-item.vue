<template>
  <div class="mp-nav__item">
    <router-link
      class="mp-nav__item__link"
      :exact="exact"
      :to="link"

      exact-active-class="mp-nav__item__link--active"
      active-class="mp-nav__item__link--active"
    >
      <slot>{{ text }}</slot>
    </router-link>
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
}
</script>

<style lang="stylus">
@require './../styles/_config.stylus'

.mp-nav__item
  margin-left 2rem
  line-height 2.5rem
  a
    line-height 1.4rem
    color inherit
    &.mp-nav__item__link
      color $navItemLinkColor
      padding-bottom $navItemLinkUnderlineDistance
      &:hover
        margin-bottom: -$navItemLinkUnderlineWidth;
        border-bottom: $navItemLinkUnderlineWidth solid $navItemLinkUnderlineColor
        padding-bottom $navItemLinkUnderlineDistance
    &.mp-nav__item__link--active
      margin-bottom: -$navItemLinkUnderlineWidth;
      border-bottom: $navItemLinkUnderlineWidth solid $navItemLinkUnderlineColor
    // &:hover,


// .mp-nav__item
//   margin-left 15px
//   &__link
//     &--active
//       a, a:hover, a:active, a:link
//         color red


</style>