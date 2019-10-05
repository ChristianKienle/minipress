<template>
  <SnappyMain :page="page" :themeConfig="$minipress.themeConfig">
    <slot />
  </SnappyMain>
</template>

<script>
import SnappyMain from "./../components/main.vue";
import "fundamental-styles/dist/fundamental-styles.css";
export default {
  components: { SnappyMain },
  props: ["page"]
};
// <style lang="stylus">

// body {
//   margin 0
// }
// </style>
</script>

