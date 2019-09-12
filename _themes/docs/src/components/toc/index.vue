<template>
  <div>
    <MpTocItem
      v-if="titleHeading"
      :slug="titleHeading.slug"
      :level="titleHeading.level"
      :text="titleHeading.text"
      :current-hash="currentHash"
    >
      {{ titleHeading.text }}
    </MpTocItem>
    <MpTocItem
      v-for="heading in $_headings"
      :key="heading.slug"
      :slug="heading.slug"
      :level="heading.level"
      :text="heading.text"
      :current-hash="currentHash"
    >
      <MpTocItemLink
        :slug="heading.slug"
        :level="heading.level"
        :text="heading.text"
        :current-hash="currentHash"
      />
    </MpTocItem>
  </div>
</template>

<script>
import MpTocItem from './item.vue'
import MpTocItemLink from './link.vue'

export default {
  components: {
    MpTocItemLink,
    MpTocItem
  },
  props: {
    titleHeading: {
      type: Object,
      default: null
    },
    headings: {
      type: Array,
      default: null
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
  computed: {
    $_headings() {
      const { headings } = this
      return headings != null ? headings : this.$minipress.headings
    }
  },
  watch: {
    $_headings: {
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
    this.setupObserverIfPossible()
  },

  beforeDestroy() {
    this.disconnectObserverIfPossible()
  },
  methods: {
    disconnectObserverIfPossible() {
      if (this.observer != null) {
        this.observer.disconnect()
        this.observer = null
      }
    },
    setupObserverIfPossible() {
      if (process.client === false) {
        return
      }
      this.disconnectObserverIfPossible()

      if(this.$el == null) {
        return
      }

      this.observer = new IntersectionObserver(([firstEntry]) => {
        if (this.isRoute || this.justMounted) {
          this.isRoute = false
          this.justMounted = false
        } else if (
          firstEntry.boundingClientRect.bottom <=
          firstEntry.intersectionRect.bottom
        ) {
          const hash = `#${firstEntry.target.id}`
          history.replaceState(null, null, hash)
          this.currentHash = hash
        }
      })

      this.$_headings.forEach(heading => {
        const el = document.querySelector(`#${heading.slug}`)
        if(el == null) {
          return
        }
        this.observer.observe(el)
      })
    },
    classesForHeading(heading) {
      return {
        'router-link-active': `#${heading.slug}` === this.currentHash
      }
    }
  }
}
</script>
