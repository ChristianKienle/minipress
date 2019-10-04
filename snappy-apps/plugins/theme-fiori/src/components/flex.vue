<template>
  <div class="mp-flex" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MpFlex",
  props: {
    centerItems: {
      type: Boolean,
      default: true
    },
    responsive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        'mp-flex--responsive': this.responsive,
        'mp-flex--center': this.centerItems
      }
    }
  }
};
</script>


<style lang="stylus">
@require './../styles/_mixins.stylus'

.mp-flex
  display flex
  flex-direction row
  &--center
    align-items center
  &--responsive
    +forCompact()
      display flex
      flex-direction column
</style>