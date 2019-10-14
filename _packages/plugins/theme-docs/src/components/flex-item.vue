<template>
  <div class="mp-flex__item" :class="classes" :style="styles">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MpFlexItem",
  props: {
    top: Boolean,
    bottom: Boolean,
    grow: {
      type: Number,
      default: null
    }
  },
  computed: {
    styles() {
      return {
        flexGrow: this.grow ? String(this.grow) : null
      }
    },
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
@require './../styles/_mixins.stylus'

.mp-flex__item
  + .mp-flex__item
    margin-left 0.5rem
  padding: 0rem
  &--top
    align-self: flex-start;
  &--bottom
    align-self: flex-end;

.mp-flex--responsive .mp-flex__item
  +forCompact()
    + .mp-flex__item
      margin-left 0
      margin-top 0.5rem
</style>