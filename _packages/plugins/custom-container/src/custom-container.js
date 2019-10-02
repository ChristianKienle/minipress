// @ts-check
const markdownItContainer = require('markdown-it-container')

const defaultRenderBefore = ({ title }) => `<MiniTip title="${title}">`
const defaultRenderAfter = () => '</MiniTip>'

/**
 * @param {import('markdown-it')} md
 * @param {import('./types').Options} options
 */
module.exports = (md, options) => {
  const {
    type,
    defaultTitle,
    renderBefore = defaultRenderBefore,
    renderAfter = defaultRenderAfter
  } = options
  const TYPE_RE = new RegExp(`^${type}\\s+(.*)`, 'gi')

  const validate = params => {
    return params.trim().match(TYPE_RE);
    // return params.trim().match(/^tip\s+(.*)$/);
  }
  const render = (tokens, idx) => {
    const m = tokens[idx].info.trim().match(TYPE_RE);
    if (tokens[idx].nesting === 1) {
      // opening tag
      const title = m[1] || defaultTitle
      const html = renderBefore({title});
      // const r = md.render(apiMd);
      // // @ts-ignore
      // const html = r//.html;
      return html;
    }
    return renderAfter()
  }
  markdownItContainer(md, type, { render, validate });
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
