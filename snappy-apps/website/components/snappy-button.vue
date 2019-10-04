<template>
  <a v-if="isExternal" class="mp-button" :href="to" :class="classes"
    ><slot
  /></a>
  <MiniLink v-else class="mp-button" :to="to_" :class="classes"
    ><slot
  /></MiniLink>
</template>

<script>
export default {
  props: {
    to: String,
    secondary: Boolean,
    block: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return {
        "mp-button--secondary": this.secondary,
        "mp-button--primary": !this.secondary,
        "mp-button--block": this.block
      };
    },
    isExternal() {
      /** @type {string} */
      const to = this.to;
      const match = to.match(/^(http(s?):\/\/)(.*)/);
      return match != null && match.length > 1;
    },
    to_() {
      return this.$minipress.pageLink(this.to);
    }
  }
};
</script>

<style scoped lang="stylus">
$primaryBackground = darken(#0065cb, 0%);
$primaryColor = white;
$secondaryBackground = darken(#efefef, 0%);
$secondaryColor = gray;

.mp-button
  text-align center
  display inline-block
  padding: 15px 25px;
  font-weight: 600;
  font-size: 1.2rem;
  transition: background 0.2s ease-in-out;
  border-radius: 5px;
  &--block
    display block
  &--secondary
    color: $secondaryColor;
    background: $secondaryBackground;
    &:hover
      color: darken($secondaryColor, 50%);
      background: lightness(saturate($secondaryBackground, 100%), 80%);
  &--primary
      color: $primaryColor;
      background: $primaryBackground;
    &:hover
      background: darken($primaryBackground, 20%);
      color: $primaryColor;
</style>