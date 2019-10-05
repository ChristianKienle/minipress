<template>
  <FdShellHeader>
    <FdShellBar>
      <FdShellBarGroup position="start">
        <FdShellBarProduct productTitle="Snappy App Platform" />
      </FdShellBarGroup>
    </FdShellBar>
  </FdShellHeader>
</template>
  <!-- <nav class="mp-nav">
    <slot name="site" />
    <div class="mp-nav__items">
      <MpNavItem
        v-for="(item, index) in items"
        :key="item.link"
        :exact="index === 0"
        v-bind="item"
      >
        {{ item.text }}
      </MpNavItem>
    </div>
  </nav> -->

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
  background-color white
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navHeight - 1.4rem
  border-bottom: 1px solid $borderColor
.mp-nav__items
  display flex
  justify-content flex-end
  flex-shrink: 0;
  width 100%
  +forCompact()
    display none
</style>
