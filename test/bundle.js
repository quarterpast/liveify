var test = require('tap').test;
var browserify = require('browserify');
var vm = require('vm');

test('bundle transform', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.add(__dirname + '/../example/foo.coffee');
    b.transform(__dirname + '/..');
    b.bundle(function (err, src) {
        if (err) t.fail(err);
        vm.runInNewContext(src, {
            console: { log: log }
        });
    });
    
    function log (msg) {
        t.equal(msg, 555);
    }
});
