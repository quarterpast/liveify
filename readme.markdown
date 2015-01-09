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

# livescript versions

Livescript does not follow semver. For example, 1.3 is backwards-incompatible with code written in 1.2 using `require!`. This causes problems with `npm`; because Liveify uses a semver range to specify Livescript, you can get an incompatible version when you don't expect it. To use a specific version of Livescript with Liveify, explicity install it alongside, then dedupe:

```
npm install liveify@2 LiveScript@1.2.0
npm dedupe
```

This only works with Liveify version 2 and later. Liveify 1.x will only dedupe Livescript versions 1.3.1 and later.

# license

MIT

