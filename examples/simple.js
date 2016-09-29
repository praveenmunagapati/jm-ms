var jm = require('jm-ms');
var logger = jm.getLogger('test');
var app = jm.ms();

app
    .add('/hello/:name', 'get', function (opts, cb) {
        logger.debug('hello called. \n %s', JSON.stringify(opts, null, 2));
        cb(null, { name: opts.params.name, age: opts.data.age});
    })
    .get('/hello/jeff', {age: 10}, function (err, doc) {
        logger.debug('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
    })
;
