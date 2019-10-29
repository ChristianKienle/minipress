<template>
  <MpMain :page="page" :themeConfig="$minipress.site.themeConfig" showSidebar>
    <template #default>
      <PostTitle>{{ page.frontmatter.title }}</PostTitle>
      <PostDate :value="page.frontmatter.date" />
      <slot />
    </template>
  </MpMain>
</template>

<script>
import PostTitle from './../components/blog/title.vue'
import PostDate from './../components/blog/date.vue'

export default {
  props: ['page'],
  components: {
    PostTitle, PostDate
  }
}
</script>
