var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');

var exchanges = require('../services/exchanges');

function startRandoms() {
    var names = ['Core API', 'Website', 'Twitter API', 'Facebook API'];
    var methods = ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'];
    var statusCodes = [200, 204, 201, 301, 302, 404, 500];
    var paths = ['/api/hairfies', '/api/users', '/api/businesses'];

    function oneOf(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    var i = setInterval(function () {
        exchanges.add({
            proxy: {
                name: oneOf(names),
            },
            request: {
                method: oneOf(methods),
                path: oneOf(paths),
            },
            response: {
                statusCode: oneOf(statusCodes),
            },
        });
    }, 1000);
}

startRandoms();

/* GET home page. */
router.get('/event-source', function(req, res) {
    req.socket.setTimeout(Infinity);

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write("\n");

    var listener = function (exchange) {
        writeEvent(res, uuid.v4(), 'exchange.created', exchange);
    };

    exchanges.addCreatedListener(listener);

    req.on('close', function () {
        exchanges.removeCreatedListener(listener);
    });
});

function writeEvent(res, id, name, data) {
    res.write('id: '+id+"\n");
    res.write('event: '+name+"\n");
    res.write('data:'+JSON.stringify(data)+"\n\n");
}

module.exports = router;
