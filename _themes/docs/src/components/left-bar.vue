<template>
  <div class="mp-left-bar">
    <MpToc
      :title-heading="titleHeading"
      :headings="headings"
    />
  </div>
</template>

<script>
import MpToc from './toc/index.vue'

export default {
  components: { MpToc },
  props: {
    titleHeading: {
      type: Object,
      default: null
    },
    headings: {
      type: Array,
      default: null
    }
  },

  // computed: {
  //   $_headings() {
  //     const { headings } = this
  //     const _headings = headings == null ? this.$page.headings : headings
  //     return _headings
  //   }
  // },

  // watch: {
  //   $route() {
  //     this.isRoute = true
  //     this.currentHash = this.$route.hash
  //   }
  // },

  // data() {
  //   return {
  //     currentHash: null,
  //     observer: null,
  //     isRoute: false,
  //     justMounted: true
  //   }
  // },

  // mounted() {
  //   this.observer = new IntersectionObserver(([firstEntry]) => {
  //           console.log(firstEntry.boundingClientRect)

  //     if (this.isRoute || this.justMounted) {
  //     	this.isRoute = false
  //     	this.justMounted = false
  //     } else if (firstEntry.boundingClientRect.bottom <= firstEntry.intersectionRect.bottom) {

  //       const hash = `#${firstEntry.target.id}`
  //       history.replaceState(null, null, hash)
  //       this.currentHash = hash
  //     }
  //   })

  //   this.$_headings.forEach(heading => this.observer.observe(document.querySelector(`#${heading.slug}`)))
  // },

  // beforeDestroy() {
  //   this.observer.disconnect()
  // }
}
</script>
