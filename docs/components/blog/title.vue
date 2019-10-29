<template>
  <div class="title"><slot /></div>
</template>

<script>
export default {};
</script>

<style scoped>
.title {
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  line-height: 1.9rem;
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0;
  color: #666;
  padding-bottom: 10px;
}
.title a {
  color: #666;
}
</style>