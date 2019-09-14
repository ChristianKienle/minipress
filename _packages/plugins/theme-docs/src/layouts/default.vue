<template>
  <MpMain :page="page" :themeConfig="$minipress.themeConfig" showSidebar>
    <slot />
    <!-- <template #main-content>
      <slot name="content" />
    </template> -->
  </MpMain>
</template>

<script>
import MpMain from "./../components/main.vue";
export default {
  components: { MpMain },
  props: ['page']
};
</script>
