<template>
  <div class="mp-flex">
    <slot />
  </div>
</template>

<script>
export default {
  name: "MpFlex"
};
</script>

<style lang="stylus">
.mp-flex {
  display: flex;
}
</style>