<template>
  <fd-side-nav :selectedId.sync="selectedId">
    <fd-side-nav-list :items="items">
      <template #item="item">
        <fd-side-nav-item>
          <fd-side-nav-link>{{ item.text }}</fd-side-nav-link>
          <template #subItem="subItem">
            <fd-side-nav-sub-item>
              <fd-side-nav-sub-link>{{ subItem.text }}</fd-side-nav-sub-link>
            </fd-side-nav-sub-item>
          </template>
        </fd-side-nav-item>
      </template>
    </fd-side-nav-list>
  </fd-side-nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedId: null
    }
  }
}
</script>