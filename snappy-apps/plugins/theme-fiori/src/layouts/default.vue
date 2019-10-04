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
                      <SnappyMain
                        :page="page"
                        :themeConfig="$minipress.themeConfig"
                        showSidebar
                      >
                        <slot />
                      </SnappyMain>
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
import SnappyMain from "./../components/main.vue";
import "fundamental-styles/dist/fundamental-styles.css";
export default {
  components: { SnappyMain },
  props: ["page"]
};
// <style lang="stylus">

// body {
//   margin 0
// }
// </style>
</script>

