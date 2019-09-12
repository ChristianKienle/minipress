<template>
<MpLink class="mp-button" :to="to_" :class="classes"><slot /></MpLink>
</template>

<script>
export default {
  props: {
    to: String,
    secondary: Boolean
  },
  computed: {
    classes() {
      return {
        'mp-button--secondary': this.secondary,
        'mp-button--primary': !this.secondary
      }
    },
    to_() {
      return this.$minipress.pageLink(this.to)
    }
  }
};
</script>

<style scoped lang="stylus">
$primaryBackground = #1669B1
$primaryColor = white
$secondaryBackground = darken(#efefef, 0%)
$secondaryColor = gray

.mp-button
  padding 15px 25px
  font-weight 600
  font-size 1.2rem
  transition background 0.2s ease-in-out
  border-radius 5px
  &--secondary
    color $secondaryColor
    background $secondaryBackground
    &:hover
      color darken($secondaryColor, 50%)
      background lightness(saturate($secondaryBackground, 100%), 80%)
  &--primary
    color $primaryColor
    background $primaryBackground
    &:hover
      color $primaryColor
      background lightness(saturate($primaryBackground, 100%), 50%)
</style>