var jm = require('jm-ms');
var logger = jm.getLogger('test');
var app = jm.ms();

app
    .add('/hello/:name', 'get', function (opts, cb) {
        logger.debug('hello called. \n %s', JSON.stringify(opts, null, 2));
        cb(null, { name: opts.params.name, age: opts.data.age});
    })
;

jm.ms.server(app, {
    type: 'ws',
    port: 3000
});

jm.ms.client({
    uri: 'ws://localhost:3000'
}, function(err, doc){
    var client = doc;
    client.on('open', function() {
        client.get('/hello/jeff', {age: 10}, function (err, doc) {
            logger.debug('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
        })
    });
});
