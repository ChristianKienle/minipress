# Configuration
You can configure certain aspects of *miniPress* by creating a configuration file called `minipress.config.js`.

## Basics
A *miniPress* configuration file is a normal *CommonJS*-module and basically looks like this:

```js
module.exports = {
  /* put your settings here */
}
```

### cwd
* Type: `string`
* Default: `process.cwd()`

Specify a directory which acts as the root of your *miniPress* project. This directory is used as the base for many other directories (`.temp`, `.minipress`, …).

### port
* Type: `number`
* Default: `4000`

Specify the port used when something has to be served via *HTTP*. Usually you can override this via the CLI by using `--port <port>` – for example:

``` sh
minipress dev --port 8080
```

will run *miniPress* on port `8080` – even though it may be set to something different in the configuration file.

### host
* Type: `string`
* Default: `"0.0.0.0"`

Specify the host to be used when something has to be served via *HTTP*.

### tempDir
*miniPress* is using a temporary directory to store intermediate build results. Without it *miniPress* does not work properly. By default *miniPress* simply used `$cwd/.minipress/.temp` to store those temporary files. You can override this by setting `tempDir` to a custom directory.

### build
`build` allows you to specify two things:

- `outDir`: Remember: `minipress generate` generates a static version of your site. `outDir` tells *miniPress* where to put those files. The directory you specify here must be absolute. It will be created if not present and emptied before each run. The value for `outDir` defaults to `$cwd/public`.
- `base`: The base URL your site will be deployed at. Usually you don't have to change this.

::: tip The base-Option
- If your site will be reachable directly by using just a host name like `https://example.org`, then `base` should be set to `/`.
- If your site is reachable by using a host + path like `https://example.org/my-site` then the value for `base` should be set to `/my-site/` (notice the trailing `/`).
:::

#### Default Value for `build.base`
The value of `build.base` is determined by looking at your `package.json`: If you have set a `homepage` in *miniPress* uses the path as the default value for `build.base`. This is just a convenience that can be disabled by explcitely setting `build.base` to something else.

#### Example

**package.json**

```json
{
  "homepage": "https://example.com/my-site/"
}
```

**minipress.config.js**
```js
module.exports = {
  /* build-option not set */
}
```

This will cause *miniPress* to use `/my-site` as `build.base`.

### apply
`apply` is probably one of the most powerful things you can do in your configuration file.

#### Access to the API
It opens up the whole *miniPress*-API for you. `apply` is also the main entry point for *miniPress* plugins.

::: tip
If you want to learn more about plugins you should head over to the [Plugins Guide](./plugins-and-themes/index.md).
:::

`apply` is a function that is invoked by *miniPress* once – relatively early on. Within your implementation of `apply` you have access to the *miniPress*-instance. The *miniPress*-instance allows you to do a lot. Again: Please refer to the [Plugins Guide](./plugins-and-themes/index.md) for more details.

### plugins
The `plugins`-option allows you to add and configure [*miniPress* plugins](./plugins-and-themes/index.md).

#### Example
The example below shows a `minipress.config.js`-file which installes an already existing plugin:

```js
module.exports = {
  plugins: [
    '@minipress/plugin-last-modified'
  ]
}
```

The configuration above tells *miniPress* to use the plugin `@minipress/plugin-last-modified`.

::: tip
The `@minipress/plugin-last-modified`-plugin simply makes the last modified date available on each page. You can learn more about this and other available plugins by going to the [Plugins- and Themes-Guide](./plugins-and-themes/index.md).
:::

#### Alternative Formats and Options

##### Setting Options
Plugins can be added and configured in several different ways. The example above used the package name of the plugin and nothing else. However, some plugins can be configured by specifying certain options. A plugin that expects you to specify options is the `@minipress/theme-docs`-plugin.


```js {highlightLines:['1-5', 11]}
const Options = {
  navbar: {
    items: [ { text: 'Home', link: '/' } ]
  }
}

module.exports = {
  plugins: [
    [
      '@minipress/theme-docs',
      Options
    ]
  ]
}
```

If a plugin requires options you have to wrap the plugin and options in an array (just like above).

###### Using `require(…)`
In all previous examples we always referred to plugins by using their package name. Under the hood *miniPress* will try to resolve the name in order to get the module which exports the plugin. You can also resolve the plugin ahead of time by using `resolve(…)`:

```js {highlightLines:[1, 6]}
const ThemeDocs = require('@minipress/theme-docs')
const Options = {}
module.exports = {
  plugins: [
    [
      ThemeDocs,
      Options
    ]
  ]
}
```

::: tip
You can also `require(…)` relative paths. This allows you to have your own plugins in the same package. No need to publish it on NPM if you don't want to.
:::

###### Inline Plugin
You can also define a plugin *inline*:

```js {highlightLines:['1-6', 13]}
const MyPlugin = {
  async apply(minipress, options) {
    // My Plugin Implementation goes here
    console.log(options) // logs: { hello: 'world' }
  }
}

const Options = { hello: 'world' }

module.exports = {
  plugins: [
    [
      MyPlugin,
      Options
    ]
  ]
}
```