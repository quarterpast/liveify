var LiveScript = require('LiveScript');
var through = require('through');
module.exports = function (file) {
    if (!/\.ls/.test(file)) return through();
    
    var data = '';
    return through(write, end);
    
    function write (buf) { data += buf }
    function end () {
        this.queue(LiveScript.compile(data,{filename:file,bare:true}));
        this.queue(null);
    }
};
