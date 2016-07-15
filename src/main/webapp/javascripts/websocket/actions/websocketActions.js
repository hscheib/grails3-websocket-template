var Constants = require('../constants');
var Dispatcher = require('../dispatcher/dispatcher');
var request = require('superagent');


var dispatchError = function (error, action) {
    Dispatcher.dispatch({
        action: action,
        error: error
    });
};

var hasError = function (err, res) {
    return err || res.status >= 400;
};


var getError = function (err, res) {
    if (err) {
        return err;
    }
    return {
        message: 'There was a problem with the server.'
    };
};

var WebsocketActions = {
    setState: function(state) {
        Dispatcher.dispatch({
            action: Constants.GET_STATE,
            json: state
        });
    }

};

module.exports = WebsocketActions;
