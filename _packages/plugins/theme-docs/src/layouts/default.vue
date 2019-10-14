<template>
  <MpMain :page="page" :themeConfig="$minipress.site.themeConfig" showSidebar>
    <slot />
  </MpMain>
</template>

<script>
import MpMain from "./../components/main.vue";
export default {
  components: { MpMain },
  props: ['page']
};
</script>


