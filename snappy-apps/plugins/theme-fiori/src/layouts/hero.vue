<template>
  <SnappyMain :page="page" :themeConfig="$minipress.themeConfig">
    <slot />
  </SnappyMain>
</template>

<script>
import SnappyMain from "./../components/main.vue";
import "fundamental-styles/dist/fundamental-styles.css";
import "./../fonts/72/72-Regular.ttf"
export default {
  components: { SnappyMain },
  props: ["page"]
};
  </script>
<style lang="stylus">

body {
  margin 0
  font-family "72"
}
@font-face
  font-family:"72";
  src:url(./../fonts/72/72-Regular.ttf)
</style>

