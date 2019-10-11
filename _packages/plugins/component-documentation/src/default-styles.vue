<style lang="stylus">

.component-documentation
  $heading = {
    font-size: 1.5rem
    margin: {
      bottom: 1rem
      top: 2rem
    }
    border-bottom: {
      color: #efefef
    }
  }
  > pre
    padding 0
  &__prop
  &__event
  &__slot
    p
      margin 0
  hr
    margin 0
  &__props
  &__events
  &__slots
    margin-bottom 2rem
    p
      margin 0
  &__props-heading
  &__slots-heading
  &__events-heading
    border-bottom: 1px solid $heading[border-bottom].color
    padding-bottom: 8px
    font-size: $heading[font-size]
    margin-top: $heading[margin].top
    margin-bottom: $heading[margin].bottom


</style>