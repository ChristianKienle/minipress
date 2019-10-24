
<script>
/**
 * @param {string} url
 */
const isExternalUrl = url => {
  const RE_EXTERNAL_URL = /^https?:\/\//;
  if (process.env.NODE_ENV === "development") {
    if (url == null) {
      throw Error("url cannot be nul");
    }
    if (typeof url !== "string") {
      throw Error(`the provided url ('${url}')  must be a string`);
    }
  }
  return RE_EXTERNAL_URL.test(url);
};

const renderExternalLink = h => (href, context) => {
  const { attrs } = context;
  const _attrs = {
    ...attrs,
    href,
    target: "_blank",
    rel: "noopener noreferrer"
  };
  const data = { ...context.data, attrs: _attrs };
  return h("a", data, context.children || "");
};

const renderRouterLink = h => context => {
  return h("router-link", { ...context.data }, context.children);
};

export default {
  functional: true,
  render(h, context) {
    const { props, children } = context;
    const { to } = props;
    // const { to } = props
    // We only have to check 'to' in case it is something other than a string.
    // 'to' could, for example, be a vue-router compatible object describing a
    // destination. In such a case we just assume it is valid and pass it to
    // router-link/Vue Router.
    //
    // Before we do what is described above we perform some sanity-checks:
    if (process.env.NODE_ENV === "development") {
      if (to == null) {
        throw Error("to cannot be null/undefined");
      }
    }
    if (typeof to === "string" && isExternalUrl(to)) {
      return renderExternalLink(h)(to, context);
    }
    return renderRouterLink(h)(context);
  }
};
</script>
