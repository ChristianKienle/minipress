<template>
  <MpMain :showSidebar="false"><slot /></MpMain>
</template>

<script>
import MpMain from "./../components/main.vue";
export default {
  name: "MpLayoutHero",
  components: { MpMain }
};
</script>
