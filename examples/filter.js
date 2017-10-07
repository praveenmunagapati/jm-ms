require('../lib');
var logger = console
var app = jm.ms();

app
    .use(function (opts, cb, next) {
        logger.info('filter1 called. \n %s', JSON.stringify(opts, null, 2));
        opts.data.sex = 'male';
        next();
    })
    .use('/hello/:nameOrElse', function (opts, cb, next) {
        logger.info('filter2 called. \n %s', JSON.stringify(opts, null, 2));
        opts.abc = 123;
        next();
    })
    .add('/hello/:name', 'get', function (opts, cb, next) {
        logger.info('filter3 called. \n');
        next();
    }, function (opts, cb, next) {
        logger.info('filter4 called. \n');
        next();
    })
    .use('/hello', [
        function (opts, cb, next) {
            logger.info('filter5 called. \n');
            next();
        }, function (opts, cb, next) {
            logger.info('filter6 called. \n');
            next();
        }
    ])
    .add('/hello/:name', 'get', function (opts, cb) {
        logger.info('hello called. \n %s', JSON.stringify(opts, null, 2));
        cb(null, { name: opts.params.name, age: opts.data.age});
    })
    .get('/hello/jeff', {age: 10}, function (err, doc) {
        logger.info('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
    })
;
