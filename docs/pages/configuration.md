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

### apply
`apply` is probably one of the most powerful things you can do in your configuration file.

#### Access to the API
It opens up the whole *miniPress*-API for you. `apply` is also the main entry point for *miniPress* plugins.

> If you want to learn more about plugins you should head over to the [Plugins Guide](./plugins-and-themes/index.md).

`apply` is a function that is invoked by *miniPress* once – relatively early on. Within your implementation of `apply` you have access to the *miniPress*-instance. The *miniPress*-instance allows you to do a lot. Again: Please refer to the [Plugins Guide](./plugins-and-themes/index.md) for more details.

### plugins
`plugins` allows you to configure *miniPress* plugins.

#### Example
The example below shows a `minipress.config.js`-file which installes an already existing plugin:

```js
module.exports = {
  plugins: [
    ['@minipress/plugin-last-modified' /*, options */]
  ]
}
```

This installs the `@minipress/plugin-last-modified`-plugin which basically simply adds a last modified date to each page.
