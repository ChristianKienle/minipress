<style lang="stylus">
/*
Markup Example:
<div class="sc-container">
  <details class="sc-container__details">
    <summary class="sc-container__summary">More…</summary>
    <div class="sc-container__body">
      Remaining Content goes here
    </div>
  </details>
</div>
*/
$ScContainer = {
  border-radius: 0px
  border-color: #efefef
  summary: {
    bg-color: lighten(#efefef, 80%)
  }
}
.sc-container
  border-left: 1px solid $ScContainer[border-color]
  border-right: 1px solid $ScContainer[border-color]
  border-top: 1px solid $ScContainer[border-color]
  border-bottom: 1px solid $ScContainer[border-color]
  border-radius: $ScContainer[border-radius] $ScContainer[border-radius]
  padding-left 0px
  margin-top 1rem
  margin-bottom 1rem
  &__body
    margin-left 15px
    margin-right 15px
    padding-top 8px
    padding-bottom 8px
  &__details
    border-bottom-left-radius: $ScContainer[border-radius]
    border-bottom-right-radius: $ScContainer[border-radius]
    width 100%
    p
      margin 0
  &__details[open] > &__summary
    border-bottom: 1px solid $ScContainer[border-color]
    border-bottom-left-radius 0
    border-bottom-right-radius 0
  &__summary
    user-select none
    background-color: $ScContainer[summary][bg-color]
    cursor pointer
    outline none
    font-size 0.80rem
    padding-left 3.5px
    &::-webkit-details-marker
      display: none
  &__control
    margin-top auto
    margin-bottom auto
    height 30px
    margin-right 3.5px
  &__summary > div > &__control
    transform: scale(0.5, 0.5) rotate(-90deg)
  &__details[open] > &__summary > div > &__control
    transform: scale(0.5, 0.5) rotate(0deg)
</style>