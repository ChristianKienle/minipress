<template>
  <div class="mp-layout">
    <MpNav
      class="mp-layout__nav"
      :items="$minipress.themeConfig.navbar.items"
    />
    <div class="mp-layout__content">
      <div class="mp-layout__left__container">
        <MpLeftBar
          v-show="$_headings.length > 0"
          class="mp-layout__left"
          :headings="$_headings"
          :title-heading="$_titleHeading"
        />
      </div>
      <div class="mp-layout__container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
const isNotTitleHeading = ({ level }) => level > 1
const isTitleHeading = ({ level }) => level === 1
import MpNav from './../components/nav.vue'
import MpLeftBar from './../components/left-bar.vue'
export default {
  name: 'MpLayoutDefault',
  components: { MpLeftBar, MpNav },
  props: {
    page: {
      type: Object,
      default: null
    }
  },
  computed: {
    $_headings() {
      return (this.$minipress.page.headings || []).filter(isNotTitleHeading)
    },
    $_titleHeading() {
      const titleHeadings = (this.$minipress.page.headings || []).filter(isTitleHeading)
      return titleHeadings.length > 0 ? titleHeadings[0] : null
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/_config.stylus'
@import '../styles/global.stylus'
@import '../styles/minpress-prism-theme.stylus'
@import '../styles/page/page.stylus'

.mp-layout
  padding-top $navHeight
  padding-bottom 50px

.mp-layout__left__container
  overflow-y scroll
  position fixed
  width $leftBarWidth
  top 64px
  bottom 0
  left 0
  border-right 1px solid $borderColor

.mp-layout__left
  padding-left $leftBarPaddingX
  padding-right $leftBarPaddingX
  padding-top $leftBarPaddingY
  padding-bottom $leftBarPaddingY

.mp-layout__nav
  position fixed
  top 0
  left 0
  right 0

.mp-layout__container
  margin-left "calc(%s + %s)" % ($leftBarWidth $leftBarPaddingX)
  padding-top 40px
  padding-left $leftBarPaddingX
  padding-right $leftBarPaddingX

</style>
