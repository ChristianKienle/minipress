<template>
  <button
    v-on="$listeners"
    class="button"
    style="width: 20px; height: 20px; margin-right: 10px;"
  >
    <BurgerIcon :aria-pressed="pressed"/>
  </button>
</template>

<script>
import BurgerIcon from "./burger-icon.vue";

export default {
  components: { BurgerIcon },
  props: {
    pressed: Boolean
  }
};
</script>

<style lang="stylus" scoped>
.button
  background-color transparent
  padding 0
  border 0
  transition background 0.2s ease-in-out
  border-radius 0px
  outline none
  cursor pointer
</style>