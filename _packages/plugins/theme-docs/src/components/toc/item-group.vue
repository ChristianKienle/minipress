<template>
  <div>
    <MpItem
      v-for="heading in items"
      :key="heading.slug"
      :level="heading.level"
      :isActive="itemIsActive(heading)"
    >
      <MpItemLink
        :slug="heading.slug"
        :level="heading.level"
        :text="heading.text"
        :to="heading.link"
        :current-hash="currentHash"
      />
    </MpItem>
  </div>
</template>

<script>
import MpItem from './item.vue'
import MpItemLink from './link.vue'

export default {
  components: {
    MpItem, MpItemLink
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
   data() {
    return {
      currentHash: null,
      observer: null,
      isRoute: false,
      justMounted: true
    }
  },
  watch: {
    items: {
      immediate: true,
      handler() {
        this.setupObserverIfPossible()
      }
    },
    $route() {
      this.isRoute = true
      this.currentHash = this.$route.hash
    }
  },
  mounted() {
    this.setupObserverIfPossible();
  },

  beforeDestroy() {
    this.disconnectObserverIfPossible();
  },
  methods: {
    itemIsActive({ slug }) {
      return `#${slug}` === this.currentHash
    },
    disconnectObserverIfPossible() {
      if (this.observer != null) {
        this.observer.disconnect();
        this.observer = null;
      }
    },
    setupObserverIfPossible() {
      if (process.client === false) {
        return;
      }
      this.disconnectObserverIfPossible();

      if (this.$el == null) {
        return;
      }

      this.observer = new IntersectionObserver(([firstEntry]) => {
        if (this.isRoute || this.justMounted) {
          this.isRoute = false;
          this.justMounted = false;
        } else if (
          firstEntry.boundingClientRect.bottom <=
          firstEntry.intersectionRect.bottom
        ) {
          const hash = `#${firstEntry.target.id}`;
          history.replaceState(null, null, hash);
          this.currentHash = hash;
        }
      });

      this.items.forEach(heading => {
        const el = document.querySelector(`#${heading.slug}`);
        if (el == null) {
          return;
        }
        this.observer.observe(el);
      });
    }
  }
};
</script>
