<template>
  <div class="hero">
    <h1 class="hero-title">Blog</h1>
    <FollowUsButton />
  </div>
</template>

<script>
import FollowUsButton from './follow-us-button.vue'
export default {
  components: { FollowUsButton }
}
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(236, 236, 236);
  margin-bottom: 100px;
}

.hero-title {
  font-size: 3rem;
  color: black;
}
</style>