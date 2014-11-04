var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('lodash');
var ProxyStore = require('./ProxyStore');

var CHANGE_EVENT = 'change';
var _numUnreadByProxy = [];

function _getNumUnreadForProxy(proxy) {
    return _numUnreadByProxy[proxy.name] || 0;
}

function _setNumUnreadForProxy(proxy, num) {
    _numUnreadByProxy[proxy.name] = num;
}

function _addUnreadToProxy(proxy) {
    _setNumUnreadForProxy(proxy, _getNumUnreadForProxy(proxy) + 1);
}

function _readProxy(proxy) {
    _setNumUnreadForProxy(proxy, 0);
}

var UnreadExchangeStore = merge(EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getNumForProxy: _getNumUnreadForProxy
});

UnreadExchangeStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.type) {
        case AppConstants.ActionTypes.RECEIVE_EXCHANGE:
            var proxy = action.exchange.proxy;
            if (!ProxyStore.isOpenProxy(proxy)) {
                _addUnreadToProxy(proxy);
                UnreadExchangeStore.emitChange();
            }
            break;
    }
});

// note: can a store listen to other stores? seems like a shortcut
ProxyStore.addChangeListener(function () {
    var proxy = ProxyStore.getOpenProxy();
    if (UnreadExchangeStore.getNumForProxy(proxy) > 0) {
        _readProxy(proxy);
        UnreadExchangeStore.emitChange();
    }
});

module.exports = UnreadExchangeStore;
