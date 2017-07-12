if (typeof module !== 'undefined' && module.exports) {
    require('../lib');
    jm.use(require('jm-log4js'));
    Promise = require('bluebird');
}

(function(){
    var ms = jm.ms;
    var logger = jm.logger;
    var utils = jm.utils;
    var pathToRegexp = ms.pathToRegexp;
    var app = ms();

    var log = function(err, doc){
        if (err) {
            logger.error(err.stack);
        }
        if(doc){
            logger.debug('%s', utils.formatJSON(doc));
        }
    };

    var done = function(resolve, reject, err, doc){
        log(err, doc);
        if (err) {
            reject(err, doc);
        } else {
            resolve(doc);
        }
    };

    var add = function(opts){
        return new Promise(function(resolve, reject){
            logger.debug('add %s', utils.formatJSON(opts));
            app.add(opts, function(err, doc){
                log(err, doc);
                resolve(doc);
            });
        });
    };

    var request = function(opts){
        return new Promise(function(resolve, reject){
            logger.debug('request %s', utils.formatJSON(opts));
            app.request(opts, function(err, doc){
                log(err, doc);
                resolve(doc);
            });
        });
    };

    var testws = function(opts){
        return new Promise(function(resolve, reject){
            logger.debug('test ws');

            if(ms.server)
            ms.server(app, {
                type: 'ws',
                port: 3100
            });

            ms.client({
                type: 'ws',
            }, function(err, doc){
                var client = doc;
                client.on('open', function(event) {
                    client.request(opts.request, function(err, doc){
                        log(err, doc);

                        //性能测试
                        jm.getLogger('jm-ms-ws:server').setLevel('INFO');
                        jm.getLogger('jm-ms-ws:client').setLevel('INFO');
                        logger.setLevel('INFO');
                        logger.info('开始性能测试 jm-ms-ws');
                        var count = 100;
                        var data = [];
                        for(var i=0; i<count; i++) data.push(i);
                        var t = Date.now();
                        var request = function(){
                            return new Promise(function(resolve, reject){
                                client.request(opts.request, function(err, doc){
                                    if (err) {
                                        reject(err, doc);
                                    } else {
                                        resolve(doc);
                                    }
                                });
                            });
                        };
                        Promise.each(data, request).then(function(){
                            logger.info('jm-ms-ws 请求 %j 次, 耗时 %j 毫秒', count, Date.now() - t);
                        });
                    });
                });
            });
            resolve(null);
        });
    };

    var testhttp = function(opts){
        return new Promise(function(resolve, reject){
            logger.debug('test http');

            if(ms.server)
            ms.server(app, {
                type: 'http'
            });

            ms.client({
                type: 'http'
            }, function(err, doc){
                var client = doc;
                client.request(opts.request, function(err, doc){
                    log(err, doc);

                    //性能测试
                    jm.getLogger('jm-ms-http:server').setLevel('INFO');
                    jm.getLogger('jm-ms-http:client').setLevel('INFO');
                    logger.setLevel('INFO');
                    logger.info('开始性能测试 jm-ms-http');
                    var count = 100;
                    var data = [];
                    for(var i=0; i<count; i++) data.push(i);
                    var t = Date.now();
                    var request = function(){
                        return new Promise(function(resolve, reject){
                            client.request(opts.request, function(err, doc){
                                if (err) {
                                    reject(err, doc);
                                } else {
                                    resolve(doc);
                                }
                            });
                        });
                    };
                    Promise.each(data, request).then(function(){
                        logger.info('jm-ms-http 请求 %j 次, 耗时 %j 毫秒', count, Date.now() - t);
                    });
                });
            });
            resolve(null);
        });
    };

    var opts = {
        uri: '/users/:id',
        type: 'post',
        fn: function(opts, cb){
            logger.debug('fn called. %s', utils.formatJSON(opts));
            cb(null, opts.data);
        },
        request: {
            uri: '/users/123',
            type: 'post',
            data: {
                test: true
            }
        }
    };

    add(opts)
        //.then(function(doc){
        //    return request(opts.request);
        //})
        //.then(function(doc){
        //    return remove(opts);
        //})
        .then(function(doc){
            return testws(opts);
        })
        .then(function(doc){
            return testhttp(opts);
        })
        .catch(SyntaxError, function(e) {
            logger.error(e.stack);
        })
        .catch(function(e) {
            logger.error(e.stack);
        });

})();