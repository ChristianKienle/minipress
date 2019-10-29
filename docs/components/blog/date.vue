<template>
  <div class="date">{{ formattedValue }}</div>
</template>

<script>
// @ts-nocheck
export default {
  props: {
    value: {
      type: [Date, String],
      required: true
    }
  },
  computed: {
    date() {
      const { value } = this
      if (typeof value === 'string') {
        return new Date(value)
      }
      return value;
    },
    formattedValue() {
      const { date } = this
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Intl.DateTimeFormat('en-US', options).format(date)
    }
  }
}
</script>

<style scoped>
.date {
  font-size: 1.1rem;
  color: #888;
  font-weight: 600;
}
</style>
