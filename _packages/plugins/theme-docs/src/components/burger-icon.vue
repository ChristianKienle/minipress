<template>
  <svg
    class="mp-burger-icon"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <foreignObject width="16" height="16">
      <svg>
        <rect x="0.5" y="0.5" width="15" height="1" rx="0.5"></rect>
        <rect x="0.5" y="14.5" width="15" height="1" rx="0.5"></rect>
        <rect x="0.5" y="7.5" width="15" height="1" rx="0.5"></rect>
      </svg>
    </foreignObject>
  </svg>
</template>

<style lang="stylus">
$burger-accent-color = #979797
$burger-active-color = darken($burger-accent-color, 50%)
.mp-burger-icon
  fill white
  stroke $burger-accent-color
  &:hover
  &[aria-pressed="true"]
    stroke $burger-active-color
</style>