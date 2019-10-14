<template>
  <div class="component-documentation__method">
    <div class="component-documentation__method-name">{{ name }}</div>
    <div class="component-documentation__method-description">
      <slot name="description" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>
