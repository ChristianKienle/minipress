<template>
  <summary class="sc-container__summary">
    <div style="display: flex;">
    <ToggleControl class="sc-container__control"  />
    <slot />
    </div>
  </summary>
</template>

<script>
import ToggleControl from './toggle-control.vue'
export default {
  components: {
    ToggleControl
  }
}
</script>
