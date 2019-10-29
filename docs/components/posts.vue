<template>
<div>
  <BlogHero />
  <div class='posts'>
    <div class='post' v-for='post in posts' :key='post.key'>
      <PostTitle>
        <MiniLink :to='post.path'>
          {{ post.title }}
        </MiniLink>
      </PostTitle>
      <PostDate :value='post.frontmatter.date' />
      <div>
        <Excerpt :ofPageWithKey="post.key" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ts-nocheck
import PostTitle from './blog/title.vue'
import PostDate from './blog/date.vue'
import BlogHero from './blog/hero.vue'

export default {
  components: { BlogHero, PostTitle, PostDate },
  computed: {
    posts() {
      return this.$minipress.site.posts
    }
  }
}
</script>
<style scoped>
.posts {
  margin-left: auto;
  margin-right: auto;
}

.post {
  margin-bottom: 4rem;
}
</style>