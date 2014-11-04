var http = require('http');
var httpProxy = require('http-proxy');
var Exchanges = require('./services/exchanges');

module.exports = {
    create: function (definition) {
        var options = {
            target: definition.target,
            forward: definition.target,
        };

        var server = http.createServer(function (req, res) {
            var exchange = {};
            exchange.appName = definition.name;
            exchange.request = {};
            exchange.request.method = req.method;
            exchange.request.path = req.url;
            exchange.request.body = '';
            exchange.response = {};
            exchange.response.body = '';

            var original = patch(res, {
                write: function (chunk) {
                    G
                },
            });

            req.on('data', function (chunk) {
                exchange.request.body += chunk;
            });

            res.on('finish', function () {
                Exchanges.add(exchange);
            });

            httpProxy.createProxyServer(options).web(req, res, function (e) {
                console.log(e);
            });
        });

        server.listen(definition.port);

        return server;
    }
};

function patch(obj, properties) {
    var old = {}
    for (var name in properties) {
        old[name] = obj[name]
            obj[name] = properties[name]
    }
    return old
}

function append(buffer, chunk) {
    if (!Buffer.isBuffer(chunk)) chunk = new Buffer(chunk)
    var target = new Buffer(buffer.length + chunk.length);
    buffer.copy(target);
    chunk.copy(target, buffer.length);
    return target;
}
