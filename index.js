var coffee = require('coffee-script');
var through = require('through');

module.exports = function (file) {
    if (!/\.coffee$/.test(file)) return through();
    
    var data = '';
    return through(write, end);
    
    function write (buf) { data += buf }
    function end () {
        this.queue(coffee.compile(data));
        this.queue(null);
    }
};
