<template>
  <button @click="count += 1">You have clicked me {{ count }} times</button>
</template>

<script>
export default {
  data() {
    return {
      count: 1
    }
  }
}
</script>
