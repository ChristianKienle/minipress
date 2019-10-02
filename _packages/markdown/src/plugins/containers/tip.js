// @ts-check
const markdownItContainer = require('markdown-it-container')

// const createPlugin

const renderTipBegin = title => `<MiniTip title="${title}">`
const renderTipEnd = title => '</MiniTip>'

module.exports = (md, options = {}) => {
  const validate = params => {
    return params.trim().match(/^tip\s+(.*)$/);
  }
  const render = (tokens, idx) => {
    const m = tokens[idx].info.trim().match(/^tip\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      // opening tag
      const title = m[1];
      const html = renderTipBegin(title);
      // const r = md.render(apiMd);
      // // @ts-ignore
      // const html = r//.html;
      return html;
    }
    return `${renderTipEnd()}\n`
  }
  markdownItContainer(md, 'tip', { render, validate });
}


// /** @param {Options} options */
// module.exports = options => {
//   /** @param {import("markdown-it")} md */
//   const plugin = md => {
//     const { renderComponentNamed } = options;
//     function validate(params) {
//       return params.trim().match(/^api\s+(.*)$/);
//     }
//     function render(tokens, idx) {
//       const m = tokens[idx].info.trim().match(/^api\s+(.*)$/);
//       if (tokens[idx].nesting === 1) {
//         // opening tag
//         const componentName = m[1];
//         const apiMd = renderComponentNamed(componentName);
//         const r = md.render(apiMd);
//         // @ts-ignore
//         const html = r.html;
//         return html;
//       }
//       return '\n';
//     }
//     markdownItContainer(md, 'api', { render, validate });
//   };
//   return plugin;
// };
