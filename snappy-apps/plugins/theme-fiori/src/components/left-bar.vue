<template>
  <div class="mp-left-bar">
    <SideNav :items="sidenavItems" />
    <!-- <MpToc :title-heading="titleHeading" :headings="headings">
      <template #before>
        <MpItemGroup class="navbar-items" :items="navbarItems_" />
      </template>
    </MpToc> -->
  </div>
</template>

<script>
import SideNav from "./side-nav.vue"
import MpToc from "./toc/index.vue";
import MpItemGroup from "./toc/item-group.vue";
export default {
  components: { SideNav, MpToc, MpItemGroup },
  computed: {
    // Transform nav items into our standard
    // item-object-shape.
    navbarItems_() {
      return this.navbarItems.map(item => ({
        level: 2,
        ...item
      }))
    }
  },
  props: {
    sidenavItems: {
      type: Array,
      default: () => []
    },
    titleHeading: {
      type: Object,
      default: null
    },
    headings: {
      type: Array,
      default: null
    },
    navbarItems: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
@require './../styles/_config.stylus'
@require './../styles/_mixins.stylus'

.navbar-items
  border-bottom 1px solid $borderColor
  margin-bottom $leftBarPaddingY
  padding-bottom $leftBarPaddingY
  display none
  +forCompact()
    display block
</style>