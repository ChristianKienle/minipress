<template>
  <span class="logo">
    <span class="logo__mini"><span class="logo__mini--0">m</span><span class="logo__mini--1">i</span><span class="logo__mini--2">n</span><span class="logo__mini--3">i</span>
    </span>Press</span>
</template>

<style lang="stylus">

colorful-colors = {
  c0: #BD0303,
  c1: #DFDE00,
  c2: #009A09,
  c3: #4E92D9
}

$logoColor = #cccccc

monochrome-colors = {
  c0: $logoColor,
  c1: $logoColor,
  c2: $logoColor,
  c3: $logoColor
}
colors = monochrome-colors

.logo
  &__mini
    padding-left 0.1rem
    padding-right 0.1rem
    padding-top 0.3rem
    padding-bottom 0.3rem
    border-radius 0.33rem
    font-weight 600
    &--0
      padding 0
      margin 0
      color: colors[c0]
    &--1
      padding 0
      margin 0
      color: colors[c1]
    &--2
      padding 0
      margin 0
      color: colors[c2]
    &--3
      padding 0
      margin 0
      color: colors[c3]
</style>