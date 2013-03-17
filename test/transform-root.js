var test      =  require('tap').test;
var fs        =  require('fs');
var path      =  require('path');
var through   =  require('through');
var convert   =  require('convert-source-map');
var transform =  require('..');

test('transform allows overriding root directory, given file is directly in root', function (t) {
    t.plan(1);
    var data = '';

    var file = path.join(__dirname, '../example/foo.coffee')
    transform.root = path.dirname(file);

    fs.createReadStream(file)
        .pipe(transform(file))
        .pipe(through(write, end));
    
    function write (buf) { data += buf }
    function end () {
        var sourceMap = convert.fromSource(data).toObject();

        t.deepEqual(
            sourceMap,
            { version: 3,
              file: 'foo.js',
              sourceRoot: '',
              sources: [ 'foo.coffee' ],
              names: [],
              mappings: ';AAAA;CAAA;CAAA,CAAA,CAAA,IAAO,GAAK;CAAZ',
              sourcesContent: [ 'console.log(require \'./bar.js\')\n' ] },
            'adds sourcemap comment with sources pointing to files relative to given root when file is directly in root'
      );
    }
});

test('transform allows overriding root directory, given file is one dir below root', function (t) {
    t.plan(1);
    var data = '';

    var file = path.join(__dirname, '../example/foo.coffee')
    transform.root = path.join(__dirname, '..');

    fs.createReadStream(file)
        .pipe(transform(file))
        .pipe(through(write, end));
    
    function write (buf) { data += buf }
    function end () {
        var sourceMap = convert.fromSource(data).toObject();

        t.deepEqual(
            sourceMap,
            { version: 3,
              file: 'foo.js',
              sourceRoot: '',
              sources: [ '/example/foo.coffee' ],
              names: [],
              mappings: ';AAAA;CAAA;CAAA,CAAA,CAAA,IAAO,GAAK;CAAZ',
              sourcesContent: [ 'console.log(require \'./bar.js\')\n' ] },
            'adds sourcemap comment with sources pointing to files relative to root'
      );
    }
});
