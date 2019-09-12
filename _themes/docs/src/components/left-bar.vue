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
  }
}
</script>
