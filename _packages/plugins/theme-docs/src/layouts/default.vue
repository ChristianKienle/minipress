<template>
  <MpMain :page="page" :themeConfig="$minipress.themeConfig" showSidebar>
    <!-- xx<Xxx />xx -->
    <slot />
  </MpMain>
</template>

<script>
import MpMain from "./../components/main.vue";
import Xxx from './../xxx.vue'
console.log(Xxx)
export default {
  components: { Xxx, MpMain },
  props: ['page']
};
</script>


