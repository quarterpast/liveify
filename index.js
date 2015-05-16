var LiveScript = require('livescript');
var through = require('through');

// Compile all variables as constants if the LSC_CONST
// environment variable is set to "true"
var k = process.env.LSC_CONST === 'true';

// Consider files as livescript if they end in ".ls"
var IS_LS = /\.ls$/i;

module.exports = function (file) {
    if (!IS_LS.test(file)) return through();
    
    var data = '';
    return through(write, end);
    
    function write (buf) { data += buf }
    function end () {
        try {
          var js = LiveScript.compile(data, {
            'filename': file,
            'const': k,
            'bare': true
          });
          this.queue(js);
        } catch (e) {
          this.emit('error', e);
        }
        this.queue(null);
    }
};
