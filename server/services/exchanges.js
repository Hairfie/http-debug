'use strict';

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;

var CREATED_EVENT = 'created';

var Exchanges = _.extend(new EventEmitter(), {
    addCreatedListener: function (callback) {
        this.on(CREATED_EVENT, callback);
    },
    removeCreatedListener: function (callback) {
        this.removeListener(CREATED_EVENT, callback);
    },
    add: function (exchange) {
        this.emit(CREATED_EVENT, exchange);
    }
});

module.exports = Exchanges;
