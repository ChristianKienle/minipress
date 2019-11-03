<template>
  <span class="logo">
    <span v-if="prefix != null" class="logo__prefix">{{ prefix }}</span><span v-if="suffix != null">{{ suffix }}</span>
    <span v-if="prefix == null && suffix == null">{{ text }}</span>
  </span>
</template>

<script>
export default {
  props: {
    suffix: String,
    prefix: String,
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/_config.stylus';
.logo
  color $logo-color
  font-weight 400
  &__prefix
    padding-left 0.1rem
    padding-right 0.1rem
    padding-top 0.3rem
    padding-bottom 0.3rem
    border-radius 0.33rem
    color:$logo-color
    font-weight 700
</style>