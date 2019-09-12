<template>
  <div class="mp-flex__item" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MpFlexItem",
  props: {
    top: Boolean,
    bottom: Boolean
  },
  computed: {
    classes() {
      return {
        'mp-flex__item--top': this.top,
        'mp-flex__item--bottom': this.bottom
      }
    }
  }
};
</script>

<style lang="stylus">
.mp-flex__item
  padding: 1rem
  &--top
    align-self: flex-start;
  &--bottom
    align-self: flex-end;
</style>