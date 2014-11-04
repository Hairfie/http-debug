var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _ = require('lodash');

var CHANGE_EVENT = 'change';
var _proxies = [];
var _openProxy = null;

function _hasProxy(proxy) {
    return _.filter(_proxies, function (candidate) {
        return candidate.name == proxy.name;
    }).length > 0;
}

function _addProxy(proxy) {
    _proxies.push(proxy);
}

function _getProxies() {
    return _proxies;
}

function _isOpenProxy(proxy) {
    return _openProxy.name == proxy.name;
}

function _setOpenProxy(proxy) {
    _openProxy = proxy;
}

function _getOpenProxy() {
    return _openProxy;
}

var ProxyStore = merge(EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    getAll: _getProxies,
    getOpenProxy: _getOpenProxy,
    isOpenProxy: _isOpenProxy
});

ProxyStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.type) {
        case AppConstants.ActionTypes.OPEN_PROXY:
            var proxy = action.proxy;
            if (!_isOpenProxy(proxy)) {
                _setOpenProxy(proxy);
                ProxyStore.emitChange();
            }
            break;
        case AppConstants.ActionTypes.RECEIVE_EXCHANGE:
            var proxy = action.exchange.proxy;
            if (!_hasProxy(proxy)) {
                _addProxy(proxy);
                if (1 == ProxyStore.getAll().length) {
                    _setOpenProxy(proxy);
                }
                ProxyStore.emitChange();
            }
            break;
    }
});

module.exports = ProxyStore;
