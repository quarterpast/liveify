var coffee = require('coffee-script');
var through = require('through');
var convert = require('convert-source-map');

function compile(file, data) {
    var compiled = coffee.compile(data, { sourceMap: true, filename: file });
    var comment = convert
        .fromJSON(compiled.v3SourceMap)
        .setProperty('sourcesContent', [ data ])
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
