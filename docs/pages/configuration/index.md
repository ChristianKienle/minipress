# Configuration

## Configuration File

### cwd
* Type: `string`
* Default: `process.cwd()`

### pages
* Type: `string`
* Default: `$cwd`

### layouts
* Type: `Layouts`
* Default: `{}`

Specify the available layouts. The value of `layouts` can be

- **A Directory:** (type `string`): In that case every `*.vue`-file in that directory automatically becomes a layout. The name of the layout will be the name of the corresponding file (`post.vue` will be available as the layout named `post`).
- **An Object:** mapping the name of a layout to a `*.vue`-file. This gives you more control.
- `undefined`.

``` ts
type Layouts =
  | string /* path to a layouts-directory */
  | { [layoutName: string]: string
  ;
```

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

### components
* Type: `string`
* Default: `undefined`

Specify a directory which contains `*.vue`-file. Components in that directory will be globally available – for example in your markdown files.

### theme
* Type: `Theme`
* Default: `the default theme`

Specify a theme that should be used. A theme is a normal CommonJS-module that exposes a theme. If you want to learn more you should head over to the [Theme Guide](./../themes/index.md).

### themeConfig
* Type: `object`
* Default: `{}`

Specify the configuration of the theme.

### configureSiteData
* Type: `SiteDataFn`
* Default: *no additional configuration is performed*

Modify the site data. The site data will be available via `$site` and exposes meta data for the whole site.

``` ts
type SiteDataFn = ($site: object) => Promise<object | void>
```

`configureSiteData` must be a function which takes the current site data object. You can directly mutate `$site` or returns a completely new object.

**Example:**

``` js
module.exports = {
  configureSiteData($site) {
    $site.productName = 'miniPress'
  }
}
```

Now you can access the value for `productName` in your `*.vue`/`*.md`-files by using `$site.productName`.

### dynamicModules
* Type: `({ context: Minipress }) => DynamicModules`
* Default: `() => {}`

Specify custom dynamic modules.

``` ts
type DynamicModules = {
  [name: string]: string
}
```

`dynamicModules` is a function that will be called with the current *miniPress*-instance. You have to return an object mapping module name to the code of a module that should be injected in the app.

**Example:**

``` js
const package = require('./package.json')

module.exports = {
  dynamicModules($site) {
    return {
      package: `export default ${JSON.stringify(package)};`
    }
  }
}
```

This creates a module called `package` which exports the contents of your `package.json`. In your `*.vue`/`*.js`-files you can use this module like this:

``` js
import package from '#minipress/dynamic/package'
console.log('The contents of package.json:', package)
```

Dynamic modules are created at build time.
