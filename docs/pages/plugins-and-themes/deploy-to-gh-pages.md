
# plugin-deploy-to-gh-pages

## Installation
```sh
npm install @minipress/plugin-deploy-to-gh-pages --save-dev
```

## Configuration
```js {highlightLines: [3]}
module.exports = {
  plugins: [
    ['@minipress/plugin-deploy-to-gh-pages']
  ]
}
```

## Usage
`@minipress/plugin-deploy-to-gh-pages` adds a new command to the CLI. The command is called `deploy-to-gh-pages`. In order to deploy your site to GitHub Pages, just execute this command.

**package.json:**

```json {highlightLines: [3]}
{
  "scripts": {
    "deploy": "minipress deploy-to-gh-pages"
  }
}
```

## Options
`@minipress/plugin-deploy-to-gh-pages` can be configured in case the defaults don't work for you.

- `skipGenerate` – default: `false`: By default `@minipress/plugin-deploy-to-gh-pages` will generate a static build of your site and then deploy it. If you want to skip the generation process set `skipGenerate` to `true`.
- `ghpagesOptions`: Under the hood `@minipress/plugin-deploy-to-gh-pages` uses the [gh-pages](https://github.com/tschaub/gh-pages)-package to do the heavy lifting. [gh-pages](https://github.com/tschaub/gh-pages) can be configured by setting certain options. Whatever you specify in `ghpagesOptions` will be passed as is to [gh-pages](https://github.com/tschaub/gh-pages).
