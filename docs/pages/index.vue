<template>
  <div>
    <MiniFlex centerItems>
      <MiniFlexItem>
        <mp-hero-logo :width="150" />
      </MiniFlexItem>
      <MiniFlexItem :grow="2" style="text-align: center;">
        <h1>
          <em>miniPress</em>
        </h1>
        <p>
          <em>A minimalistic static site generator</em>
        </p>
        <MiniFlex responsive style="margin-top:2rem;">
          <MiniFlexItem style="width: 100%;" :grow="1">
            <mp-button to="/guide/">Get Started</mp-button></MiniFlexItem
          >
          <MiniFlexItem :grow="1" style="width: 100%;">
            <mp-button secondary :to="$minipress.site.pkg.minipress.github"
              >GitHub</mp-button
            >
          </MiniFlexItem>
        </MiniFlex>
      </MiniFlexItem>
    </MiniFlex>
    <div>
      <h2>Quickstart</h2>
      <MiniContent :pageKey="$minipress.pageForPath('/_quickstart-sample').key" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "hero"
};
// <layout>hero</layout>
</script>

