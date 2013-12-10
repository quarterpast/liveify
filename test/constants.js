var test = require('tap').test;
var browserify = require('browserify');
var vm = require('vm');

test('good constants', function (t) {
    t.plan(1);
    
    process.env.LSC_CONST = 'true';
    var b = browserify();
    b.add(__dirname + '/../example/constants.ls');
    b.transform(__dirname + '/..');
    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        vm.runInNewContext(src, {
            console: { log: log }
        });
    });
    
    function log (msg) {
        t.equal(msg, 6);
    }
});

test('bad constants', function (t) {
    t.plan(2);
    
    process.env.LSC_CONST = 'true';
    var b = browserify();
    b.add(__dirname + '/../example/bad-constants.ls');
    b.transform(__dirname + '/..');
    try {
      b.bundle(function (err, src) {
          if (err) {
            t.ok(err !== null, "There is an error");
            t.ok(
              /redeclaration/.test(String(err)),
              "... which mentions the constant pragma"
            );
          } else {
            t.fail("Expected error, got: " + src);
          }
      });
    } catch (e) {
      t.fail("Error thrown by bundle: " + e);
    }
});
