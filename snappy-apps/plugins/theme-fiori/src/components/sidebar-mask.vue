<template>
  <div v-on="$listeners" class="mp-mask" />
</template>

<script>
export default {
  name: "MpMask"
};
</script>

<style lang="stylus">
@import '../styles/_mixins.stylus';

fadeInAnimation($bgColor = '#000')
  @keyframes fadeInFromNone
    0%
      display none
      opacity 0
      background-color $bgColor
    1%
      display block
      opacity 0
      background-color $bgColor
    100%
      display block
      opacity 0.2
      background-color $bgColor

fadeInAnimation()

.mp-mask
  position fixed
  z-index 9
  top 0
  left 0
  width 100%
  height 100%
  display none
  background-color rgb(0, 0, 0)
  opacity 0
  animation: fadeInFromNone 0.5s ease-out
  animation-fill-mode forwards
+forCompact()
  .mp-docs-theme__sidebar--open .mp-mask
    display block
</style>