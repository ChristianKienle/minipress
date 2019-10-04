<template>
  <span class="logo">
    <span class="logo__mini">{{ prefix }}</span><span>{{ productName }}</span>
  </span>
</template>

<script>
export default {
  props: {
    prefix: {
      type: String,
      default: 'Snappy'
    },
    productName: {
      type: String,
      default: 'Apps'
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/_config.stylus';
.logo
  color $logo-color
  font-weight 400
  &__mini
    padding-left 0.1rem
    padding-right 0.1rem
    padding-top 0.3rem
    padding-bottom 0.3rem
    border-radius 0.33rem
    color:$logo-color
    font-weight 700
</style>