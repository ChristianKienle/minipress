<template>
  <div>
    <h1>My Test Component</h1>
    <TestComponentApi />
  </div>
</template>

<script>
import TestComponentApi from './test-component.vue?vueseapi'
export default {
  components: { TestComponentApi }
}
</script>

<style>

</style>