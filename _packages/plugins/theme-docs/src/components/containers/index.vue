<script>
import CreateContainer from './create-container'

export const Tip = CreateContainer('tip')
export const Warn = CreateContainer('warn')
export default Tip

</script>

<style scoped lang="stylus">
@import '../styles/_config.stylus';
@import '../styles/_container.stylus';

.tip
  make-container($base-color: #B2DBBF)

.warn
  make-container($base-color: #FFECBC)

</style>