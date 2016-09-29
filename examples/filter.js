var jm = require('jm-ms');
var logger = jm.getLogger('test');
var app = jm.ms();

app
    .use(function (opts, cb, next) {
        logger.debug('filter1 called. \n %s', JSON.stringify(opts, null, 2));
        opts.data.sex = 'male';
        next();
    })
    .use('/hello/:nameOrElse', function (opts, cb, next) {
        logger.debug('filter2 called. \n %s', JSON.stringify(opts, null, 2));
        opts.abc = 123;
        next();
    })
    .add('/hello/:name', 'get', function (opts, cb, next) {
        logger.debug('filter3 called. \n');
        next();
    }, function (opts, cb, next) {
        logger.debug('filter4 called. \n');
        next();
    })
    .use('/hello', [
        function (opts, cb, next) {
            logger.debug('filter5 called. \n');
            next();
        }, function (opts, cb, next) {
            logger.debug('filter6 called. \n');
            next();
        }
    ])
    .add('/hello/:name', 'get', function (opts, cb) {
        logger.debug('hello called. \n %s', JSON.stringify(opts, null, 2));
        cb(null, { name: opts.params.name, age: opts.data.age});
    })
    .get('/hello/jeff', {age: 10}, function (err, doc) {
        logger.debug('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
    })
;
