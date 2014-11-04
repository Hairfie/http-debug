var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('lodash');

var CHANGE_EVENT = 'change';
var _exchanges = [];

function _addExchange(exchange) {
    _exchanges.unshift(exchange);
}

function _getAllForProxy(proxy) {
    return _.filter(_exchanges, function (exchange) {
        return proxy.name == exchange.proxy.name;
    });
}

var ExchangeStore = merge(EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getAllForProxy: _getAllForProxy
});

ExchangeStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.type) {
        case AppConstants.ActionTypes.RECEIVE_EXCHANGE:
            _addExchange(action.exchange);
            ExchangeStore.emitChange();
            break;
    }
});

module.exports = ExchangeStore;
