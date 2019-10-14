<template>
  <div>
    <slot name="before" />
    <MpTocItem
      v-if="titleHeading"
      :slug="titleHeading.slug"
      :level="titleHeading.level"
      :text="titleHeading.text"
    >
      {{ titleHeading.text }}
    </MpTocItem>
    <MpItemGroup :items="headings" />
    <slot name="after" />
  </div>
</template>

<script>
import MpTocItem from './item.vue'
import MpTocItemLink from './link.vue'
import MpItemGroup from './item-group.vue'

export default {
  components: {
    MpItemGroup,
    MpTocItemLink,
    MpTocItem
  },
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
