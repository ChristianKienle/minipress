<template>
  <div class="mp-nav">
    <header class="mp-nav__header mp-nav--flex">
      <span class="mp-nav__logo">
        <slot name="site" />
      </span>
      <nav class="mp-nav__scroll mp-nav--push">
        <MpNavItem
          v-for="(item, index) in items"
          :key="item.link"
          :exact="index === 0"
          v-bind="item"
        >
          {{ item.text }}
        </MpNavItem>
      </nav>
    </header>
  </div>
</template>

<script>
import MpNavItem from "./nav-item.vue";
import MpLogo from "./logo.vue";
export default {
  components: { MpLogo, MpNavItem },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
@require './../styles/_config.stylus';
@require './../styles/_mixins.stylus';

$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.mp-nav
  box-sizing border-box
  z-index: 1000;
  display flex
  flex-wrap: nowrap
  background-color white
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navHeight - 1.4rem
  border-bottom: 1px solid $borderColor
  &__header
    width 100%
  &__logo
    flex: 0 0 120px;
    text-align: center;
  &--flex
    display flex
    flex-wrap nowrap
  &--push
    margin-left auto
  &__scroll
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    +forCompact()
      display none
    &::-webkit-scrollbar
      display none
</style>
