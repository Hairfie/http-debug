var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    openProxy: function (proxy) {
        AppDispatcher.handleClientAction({
            type    : ActionTypes.OPEN_PROXY,
            proxy   : proxy
        });
    }
};
