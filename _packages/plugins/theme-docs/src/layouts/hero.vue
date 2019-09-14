<template>
  <MpMain :page="page" :themeConfig="$minipress.themeConfig"
    >
    <slot />
      <!-- <template #main-content>
      <slot name="content" />
    </template> -->
    <!-- <template #content>
      <slot name="main-content" />
    </template> -->
  </MpMain>
</template>

<script>
import MpMain from "./../components/main.vue";
export default {
  components: { MpMain },
  props: ["page"]
};
</script>
