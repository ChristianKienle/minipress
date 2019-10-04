<template>
  <div>
    <MiniFlex top>
      <MiniFlexItem :grow="2">
        <h1 class="title">
          A framework for building
          <span class="title__sub">snappy and scaleable Fiori apps</span>
        </h1>
        <MiniContent pageKey="hero-intro-text" />
      </MiniFlexItem>
      <MiniFlexItem top>
        <MiniContent pageKey="quickstart" />
        <MiniFlex responsive style="margin-top:2rem;">
          <MiniFlexItem style="width: 100%;" :grow="1">
            <SnappyButton to="/guide/">Get Started</SnappyButton></MiniFlexItem
          >
          <MiniFlexItem :grow="1" style="width: 100%;">
            <SnappyButton secondary :to="$minipress.site.pkg.snappy.github"
              >GitHub</SnappyButton
            >
          </MiniFlexItem>
        </MiniFlex>
      </MiniFlexItem>
    </MiniFlex>
    <div
      style="margin-top: 1.5rem; padding-top: 2rem; border-top: 1px solid #cccccc;"
    >
      <MiniContent pageKey="features" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "hero"
};
</script>

<style scoped lang="stylus">
.title
  margin-block-start 0
  font-size 30px
  font-weight 300
  color rgb(26, 32, 44)
  &__sub
    font-size 30px
    color #0065cb
    // color #0a6dd1
    display block
</style>
