<template>
  <nav class="mp-nav">
    <div class="mp-nav__product">
      <router-link
        class="mp-nav__product__link"
        active-class=""
        exact-active-class=""
        to="/"
      >
        <MpLogo />
      </router-link>
    </div>
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
  </nav>
</template>

<script>
import MpNavItem from './nav-item.vue'
import MpLogo from './logo.vue'
export default {
  components: { MpLogo, MpNavItem },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
@require './../styles/_config.stylus';

$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.mp-nav__product
  font-size 1.3rem
  font-weight 600
  color black
  line-height 2.5rem
  &__link
    color black

.mp-nav
  z-index 1000
  display flex
  background-color white
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navHeight - 1.4rem
  border-bottom: 1px solid #efefef

.mp-nav__items
  display flex
  justify-content flex-end
  flex-grow 1

</style>
