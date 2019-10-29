<template>
  <div>
    <h1>custom layout</h1>
    {{ showsLogo }}
    <div v-show="showsLogo" style="background-color: red; color: white;">LOGO</div>
    ssss
    <slot />
  </div>
</template>
<script>
export default {
  props: ['page'],
  computed: {
    showsLogo() {
      return this.page.frontmatter.logo//.frontmatter.logo === true
    }
  }
}
</script>