<script>
import CreateContainer from './create-container'
export default  CreateContainer('error', 'ERROR')
</script>

<style scoped lang="stylus">
@import '../../styles/_container.stylus';
.error
  make-container($base-color: #FFD1DD)
</style>
