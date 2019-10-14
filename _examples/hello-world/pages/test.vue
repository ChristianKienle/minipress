<template>
  <div>


    <MiniLink to="./about.html">About</MiniLink>
    <MiniLink to="./hello.html">Hello</MiniLink>
    <MiniLink to="./markdown.html">Markdown</MiniLink>
dddyy
  </div>
</template>

<script>
// import Chris from '#minipress/pages/chris.minipresspage'
// import Chris from '/Users/d069408/ChristianKienle/minpress/_examples/hello-world/.minipress/.temp/pages/chris.minipresspage.js'
// debugger
// console.log('Chris',{Chris})
const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
export default {
    created() {
    console.log('ssr', this.$ssrContext)
    }
  // layout: 'custom',
  // Is called during SSR and then again on the client.
  // The data returned during SSR is merged with data.
  // It is also called again on the client.
  // You can have the same logic there or just do nothing since
  // you have already the data you need.
  //
  //    async asyncData() {
  //     if(process.server) {
  //       await wait()
  //       return {
  //         lastName: 'Kienle'
  //       }
  //     }
  //     return {}
  //   }
  //
  // But we should make this even smarter because:
  // During 'dev' asyncData is only executed for the initially
  // loaded page. So we should do somethign like this:
  // async asyncData(ssrData = {}) {
  //   if (ssrData.lastName != null) {
  //     console.log("lastName exists already – returning immediately");
  //     return ssrData;
  //   }
  //   console.log("lastName does NOT exist - fetching");
  //   await wait();
  //   return {
  //     lastName: "index.vue –– Kienle"
  //   };
  // }
};
</script>

