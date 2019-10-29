<template>
  <div class="follow">
    <a href="https://twitter.com/minipressvue" target="_blank" rel="noopener">Follow miniPress on Twitter <TwitterLogo /></a>
  </div>
</template>

<script>
import TwitterLogo from './twitter-logo.vue'

export default {
  components: {
    TwitterLogo
  }
}
</script>

<style scoped>
.follow {
  background-color: rgb(235, 250, 255);
  padding: 0.5rem 1rem;
  border-radius: 15px 15px;
  height: 30px;
  vertical-align: middle;
}
.follow a {
  line-height: 30px;
}
.follow a, .twitter-logo {
  vertical-align: top;
  height: 30px;
  display: inline-block;
}
</style>