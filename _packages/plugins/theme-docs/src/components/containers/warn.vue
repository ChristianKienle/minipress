<script>
import CreateContainer from './create-container'
export default CreateContainer('warn')
// export default {
//   props: {
//     title: {
//       type: String,
//       default: ''
//     }
//   },
//   computed: {
//     hasTitle() {
//       return this.title.length > 0
//     }
//   }
// };
</script>

<style scoped lang="stylus">
@import '../../styles/_config.stylus';
@import '../../styles/_container.stylus';

.warn
  make-container($base-color: #FFECBC)


// @import '../styles/_config.stylus';
// @import '../styles/_container.stylus';

// // $tipBaseColor = #B2DBBF
// // $tipColor = darken($tipBaseColor, 60%)

// .tip
//   make-container($base-color: #B2DBBF)
  // border-radius: 4px 4px
  // background-color lighten($tipBaseColor, 70%)
  // border-left 8px solid $tipBaseColor
  // padding 15px 30px 15px 15px
  // margin 2rem 0
  // color $tipColor
  // & > :first-child
  //   margin-top 0
  // & > :last-child
  //   margin-bottom 0
  // &__title
  //   font-size 1.2rem
  //   font-weight 600
  //   margin-bottom -0.9rem
  //   color darken($tipColor, 20%)
  // code
  //   background-color lighten($tipBaseColor, 40%)
  //   color $tipColor
</style>
