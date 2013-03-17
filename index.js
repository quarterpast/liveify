var coffee = require('coffee-script');
var through = require('through');
var convert = require('convert-source-map');
var path    = require('path');

function resolvePath(file) {
  if (!module.exports.root) return file;
  var relpath = path.relative(module.exports.root, file);
  
  var fileIsInRoot = path.basename(relpath) === relpath;

  if (fileIsInRoot) return relpath;

  var pathIsAbsolute = relpath[0] === '/';
  return pathIsAbsolute ? relpath : '/' + relpath;
}

function compile(file, data) {
    var compiled = coffee.compile(data, { sourceMap: true, filename: file });
    var comment = convert
        .fromJSON(compiled.v3SourceMap)
        .setProperty('sourcesContent', [ data ])
        .setProperty('sources', [ resolvePath(file) ])
        .toComment();

    return compiled.js + '\n' + comment;
}

module.exports = function (file) {
    if (!/\.coffee$/.test(file)) return through();
    
    var data = '';
    return through(write, end);
    
    function write (buf) { data += buf }
    function end () {
        this.queue(compile(file, data));
        this.queue(null);
    }
};
module.exports.root = null;
