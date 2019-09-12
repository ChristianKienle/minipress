<template>
  <MpMain showSidebar><slot /></MpMain>
</template>

<script>
import MpMain from "./../components/main.vue";
export default {
  name: "MpLayoutDefault",
  components: { MpMain }
};
</script>
