var ServerActionCreators = require('../actions/ServerActionCreators');

module.exports = {
    init: function () {
        var es = new EventSource('/exchanges/event-source');
        es.addEventListener('exchange.created', function (e) {
            ServerActionCreators.receiveExchange(JSON.parse(e.data));
        });
    }
}
