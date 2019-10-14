<script>
import CreateContainer from './create-container'
export default CreateContainer('warn', 'WARNING')
</script>

<style scoped lang="stylus">
@import '../../styles/_config.stylus';
@import '../../styles/_container.stylus';

.warn
  make-container($base-color: #FFECBC)
</style>
