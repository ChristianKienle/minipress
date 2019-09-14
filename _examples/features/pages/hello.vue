<template>
  <div>
    <h1>shhi</h1>
  </div>

</template>

<script>
const wait = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

export default {
  props: ['page', 'site', 'themeConfig'],
  async asyncData() {
    console.log('asyncData(): start')
    await wait(3000)
    console.log('asyncData(): end')
    return 'hihi'
  }
}
</script>
