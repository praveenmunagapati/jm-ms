jm-ms - a MicroService lib
===========================

This is a MicroService lib for node.js.

Install with:

    npm install jm-ms

## Usage

Simple example, included as `examples/simple.js`:

```js
var jm = require('jm-ms');
var app = jm.ms();

app
    .add('/hello/:name', 'get', function (opts, cb) {
        console.log('hello called. \n %s', JSON.stringify(opts, null, 2));
        cb(null, { name: opts.params.name, age: opts.data.age});
    })
    .get('/hello/jeff', {age: 10}, function (err, doc) {
        console.log('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
    })
;

```

This will display:

    hello called.
     {
      "uri": "/hello/jeff",
      "type": "get",
      "data": {
        "age": 10
      },
      "originalUri": "/hello/jeff",
      "baseUri": "",
      "params": {
        "name": "jeff"
      }
    }
    request /hello. get result:
     {
      "name": "jeff",
      "age": 10
    }

### Http

Simple example, included as `examples/http.js`:

```js
jm.ms.server(app, {
    type: 'http',
    port: 3000
});
```

It'll add create a web server.

```js
jm.ms.client({
    uri: 'http://localhost:3000'
}, function(err, doc){
    var client = doc;
    client.get('/hello/jeff', {age: 10}, function (err, doc) {
        logger.debug('request /hello. get result: \n %s', JSON.stringify(doc, null, 2));
    })
});
```

It'll add create a web client and do a request to the server.

### Websocket

Simple example, included as `examples/ws.js`:

```js
jm.ms.server(app, {
    type: 'ws',
    port: 3000
});
```

It'll add create a websocket server.

```js
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
```

It'll add create a websocket client and do a request to the server.

### Filter

Simple example, included as `examples/filter.js`:

## Contributors

The original author is [Jeff YU](https://github.com/jammacn)

## License

[MIT](LICENSE)

### Consolidation

If you want to join our cause by help maintaining something, please don't hesitate to contact either one of us.
