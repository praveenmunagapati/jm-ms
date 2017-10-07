require('../lib');
var app = jm.ms();

app
    .add('/hello/:name', 'get', function (opts, cb) {
        console.info('hello called. \n %s', JSON.stringify(opts, null, 2));
        cb(null, { name: opts.params.name, age: opts.data.age});
    })
    .get('/hello/jeff', {age: 10}, function (err, doc) {
        console.info('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
    })
;
