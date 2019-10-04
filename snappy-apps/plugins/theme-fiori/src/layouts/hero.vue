<template>
  <div>
    <FdShell>
      <template #header>
        <FdShellHeader>
          <FdShellBar>
            <FdShellBarGroup position="start">
              <FdShellBarProduct productTitle="Snappy App Platform" />
            </FdShellBarGroup>
          </FdShellBar>
        </FdShellHeader>
      </template>
      <template #app>
        <FdShellApp>
          <FdApp>
            <template #main>
              <FdAppMain>
                <main class="fd-page">
                  <header
                    class="fd-page__header fd-has-background-color-background-2"
                  >
                    fd-page_header
                  </header>
                  <div
                    class="fd-page__content fd-has-background-color-neutral-2"
                  >
                    <div class="fd-container">
                      <MpMain
                        :page="page"
                        :themeConfig="$minipress.themeConfig"
                        showSidebar
                      >
                        <slot />
                      </MpMain>
                    </div>
                  </div>
                </main>
              </FdAppMain>
            </template>
          </FdApp>
        </FdShellApp>
      </template>
    </FdShell>
  </div>
</template>

<script>
import MpMain from "./../components/main.vue";
import "fundamental-styles/dist/fundamental-styles.css";
export default {
  components: { MpMain },
  props: ["page"]
};
</script>


<style lang="stylus">
@import './../styles/_config.stylus'
@import './../styles/_mixins.stylus'
@import './../styles/global.stylus'
@import './../styles/prism-theme-fiori.stylus'
@import './../styles/page/page.stylus'
@import './../styles/page/headings.stylus'
body {
  margin 0
}
</style>