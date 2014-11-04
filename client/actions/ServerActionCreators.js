var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    receiveExchange: function (exchange) {
        AppDispatcher.handleServerAction({
            type    : ActionTypes.RECEIVE_EXCHANGE,
            exchange: exchange
        });
    }
};
