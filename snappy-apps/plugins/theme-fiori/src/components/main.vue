<template>
  <div class="mp-layout" :class="classes">
    <MpNav class="mp-layout__nav" :items="themeConfig.navbar.items">
      <template #site>
        <div
          style="align-items: center; justify-content: center; display: flex;"
        >
          <MpSideNavButton
            v-if="showSidebar"
            @click="toggleSidebar"
            :pressed="sidebarOpen"
            class="mp-main-sidebar-button"
          />
          <div class="mp-nav__product">
            <router-link
              class="mp-nav__product__link"
              active-class=""
              exact-active-class=""
              to="/"
            >
              <MpLogo :prefix="themeConfig.productName.prefix" :name="themeConfig.productName.name" />
            </router-link>
          </div>
        </div>
      </template>
    </MpNav>
    <MpMask @click="toggleSidebar(false)" />
    <div class="mp-layout__content">
      <div class="mp-sidebar" :class="sidebarClasses">
        <MpLeftBar
          :navbarItems="navbarItems"
          v-show="$_headings.length > 0"
          class="mp-layout__left"
          :headings="$_headings"
          :title-heading="$_titleHeading"
        />
      </div>
      <div class="mp-layout__container" :class="layoutContainerClasses">
        <div class="mp-main__content" :style="layoutContainerStyles">
          <slot  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MpNav from "./nav.vue";
import MpLeftBar from "./left-bar.vue";
import MpLogo from "./logo.vue";
import MpMask from "./sidebar-mask.vue";
import MpSideNavButton from "./side-nav-button.vue";

const isNotTitleHeading = ({ level }) => level > 1;
const isTitleHeading = ({ level }) => level === 1;

export default {
  name: "MpMain",
  components: { MpMask, MpSideNavButton, MpLogo, MpLeftBar, MpNav },
  props: {
    showSidebar: {
      type: Boolean,
      default: false
    },
    themeConfig: {
      type: Object,
      default: () => { navbar: { items: [] }}
    },
    page: {
      type: Object,
      default: null
    },
    contentWidth: {
      type: String,
      default: "800px"
    }
  },
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    toggleSidebar(openOverride) {
      this.sidebarOpen =
        typeof openOverride === "boolean" ? openOverride : !this.sidebarOpen;
    },
    onTouchStart({ changedTouches }) {
      const [touch] = changedTouches;
      this.touchStart = {
        x: touch.clientX,
        y: touch.clientY
      };
    },
    onTouchEnd(event) {
      const { changedTouches } = event;
      const [touch] = changedTouches;
      const { clientX, clientY } = touch;
      const { touchStart } = this;
      const dx = clientX - touchStart.x;
      const dy = clientY - touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    }
  },
  computed: {
    navbarItems() {
      return this.themeConfig.navbar.items;
    },
    classes() {
      return {
        "mp-docs-theme__sidebar--open": this.sidebarOpen && this.showSidebar
      };
    },
    sidebarClasses() {
      return {
        "mp-sidebar--disabled": !this.showSidebar
      };
    },
    layoutContainerStyles() {
      return {
        maxWidth: this.contentWidth
      };
    },
    layoutContainerClasses() {
      return {
        "mp-layout__container--with-sidebar": this.showSidebar,
        "mp-layout__container--without-sidebar": !this.showSidebar
      };
    },
    $_headings() {
      return (this.page.headings || []).filter(isNotTitleHeading);
    },
    $_titleHeading() {
      const titleHeadings = (this.page.headings || []).filter(
        isTitleHeading
      );
      return titleHeadings.length > 0 ? titleHeadings[0] : null;
    }
  }
};
</script>

<style lang="stylus">
@import '../styles/_mixins.stylus';
@import '../styles/_config.stylus';
@import '../styles/global.stylus';
@import '../styles/prism-theme-fiori.stylus';
@import '../styles/page/page.stylus';

.mp-nav__product
  font-size 1.3rem
  font-weight 600
  color black
  line-height 2.5rem
  &__link
    color black

.mp-layout
  padding-top $navHeight
  padding-bottom 50px

.mp-sidebar {
  background-color white
  overflow-y scroll
  position fixed;
  width $leftBarWidth
  top 63px
  bottom 0
  left 0
  z-index 999
  transition transform 0.33s ease
  border-right 1px solid $borderColor
}

.mp-sidebar--disabled {
  transform: translateX(-100%);
  transition: none
}

.mp-layout__left {
  padding 0
  padding-top: $leftBarPaddingY;
  padding-bottom: $leftBarPaddingY;
}

.mp-layout__nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.mp-layout__container {
  margin-left: 'calc(%s + %s)' % ($leftBarWidth $leftBarPaddingX);
  padding-top: 32px;
  padding-left: $leftBarPaddingX;
  padding-right: $leftBarPaddingX;

  &--with-sidebar {
    margin-left: 'calc(%s + %s)' % ($leftBarWidth $leftBarPaddingX);
  }

  &--without-sidebar {
    margin-left: 0;
  }
}

.mp-main-sidebar-button {
    display none
}

+forCompact() {
  .mp-layout__container {
    margin-left: 0;
  }
  .mp-main-sidebar-button {
    display block
  }
  .mp-docs-theme__sidebar--open .mp-sidebar {
    transform: translateX(0);
  }
  .mp-sidebar {
    transform: translateX(-100%);
  }
  .mp-docs-theme__sidebar--open .mp-sidebar__mask {
    display: block;
  }
}

.mp-main__content {
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  margin-bottom: 20px;
}
</style>
