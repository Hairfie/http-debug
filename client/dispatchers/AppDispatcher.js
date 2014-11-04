var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');
var AppConstants = require('../constants/AppConstants');

var AppDispatcher = copyProperties(new Dispatcher(), {
    handleServerAction: function (action) {
        this.dispatch({
            source: AppConstants.PayloadSources.SERVER_ACTION,
            action: action
        });
    },
    handleClientAction: function (action) {
        this.dispatch({
            source: AppConstants.PayloadSources.CLIENT_ACTION,
            action: action
        });
    }
});

module.exports = AppDispatcher;
