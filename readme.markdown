# liveify [![Build Status](https://travis-ci.org/quarterto/liveify.svg?branch=master)](https://travis-ci.org/quarterto/liveify)

browserify transform for livescript

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
module.exports = require('./baz.ls')(5)
```

baz.ls:

``` livescript
module.exports = (* 111)
```

install liveify into your app:

```
$ npm install liveify
```

when you compile your app, just pass `-t liveify` to browserify:

```
$ browserify -t liveify foo.ls > bundle.js
$ node bundle.js
555
```

# install

With [npm](https://npmjs.org) do:

```
npm install liveify
```

# options

By default livescript is compiled with the constant flag set to
false. This can be set to true by setting the environment
variable `LSC_CONST`:

```
LSC_CONST=true browserify -t liveify -e my-app.ls > my-app.js
```

# license

MIT

