# builder-target

target build plugin for [component-builder2](https://github.com/component/builder2.js).

## Example

### component.json

Let's say you have the following component, and you want to build
- one bundle for the web that use `api.js`
- another one for your native app that use `api.cordova.js`

You can define a new section in your `component.json` (here we name it cordova) and use the plugin by calling `.use('scripts', target('cordova'))`

```
{
  "cordova": {
    "api.js": "api.cordova.js"
  },
  "scripts": [
    "index.js",
    "api.js"
  ],
  "main": "index.js"
}
```

```js
var fs = require('fs');
var build = require('component-builder');
var target = require('builder-target');

// build web bundle
build.scripts(nodes)
  .use('scripts', build.plugins.js())
  .build(function (err, string) {
    if (err) throw err;
    fs.writeFileSync('build.js', string);
  })

// build cordova bundle
build.scripts(nodes)
  .use('scripts', build.plugins.js())
  .use('scripts', target('cordova'))
  .build(function (err, string) {
    if (err) throw err;
    fs.writeFileSync('build-cordova.js', string);
  })

```

## License

The MIT License (MIT)

