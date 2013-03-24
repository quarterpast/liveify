# liveify

browserify v2 plugin for livescript

mix and match `.ls` and `.js` files in the same project

**important: when using require('path/to/file.ls') remember to use .ls extension**

# example

given some files written in a mix of `js` and `ls`:

foo.ls:

``` livescript
console.log require './bar.js'
```

bar.js:

``` js
module.exports = require('./baz.coffee')(5)
```

baz.ls:

``` livescript
module.exports = (* 111)
```

install coffeeify into your app:

```
$ npm install liveify
```

when you compile your app, just pass `-t liveify` to browserify:

```
$ browserify -t liveify foo.coffee > bundle.js
$ node bundle.js
555
```

# install

With [npm](https://npmjs.org) do:

```
npm install liveify
```

# license

MIT

