require('../lib');
var logger = console
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var appWeb = express();
var server = http.createServer(appWeb).listen(3000, function () {
    logger.info("ms server listening on port " + server.address().port);
});
appWeb.use(bodyParser.json());
appWeb.use(bodyParser.urlencoded({extended: true}));
appWeb.set('trust proxy', true);

var app = jm.ms();
app
    .use(function (opts, cb, next) {
        logger.info('filter called. \n %s', JSON.stringify(opts, null, 2));
        opts.data.sex = 'male';
        opts.abc = 123;
        next();
    })
    .add('/hello/:name', 'get', function (opts, cb) {
        logger.info('hello called. \n %s', JSON.stringify(opts, null, 2));
        cb(null, { name: opts.params.name, age: opts.data.age});
    })
;

jm.ms
    .server(app, {
        type: 'http',
        app: appWeb
    })
    .server(app, {
        type: 'ws',
        server: server
    })
    .client({
        uri: 'http://localhost:3000'
    }, function(err, doc){
        var client = doc;
        client.get('/hello/http', {age: 10}, function (err, doc) {
            logger.info('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
        })
    })
    .client({
        uri: 'ws://localhost:3000'
    }, function(err, doc){
        var client = doc;
        client.on('open', function() {
            client.get('/hello/ws', {age: 10}, function (err, doc) {
                logger.info('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
            })
        });
    });

