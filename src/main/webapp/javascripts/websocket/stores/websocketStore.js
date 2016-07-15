var Dispatcher = require('../dispatcher/dispatcher');
var Constants = require('../constants');
var Store = require('./store');
var _ = require('lodash');

var _state = null;
var _error = null;


var setState = function(state) {
    _state = state;
}

var setError = function(error) {
    // Look at this page to figure out what should happen.
    // http://visionmedia.github.io/superagent/#error-handling
    _error = error.message;
}

var WebsocketStore = _.assign({}, Store, {
    getState: function() {
        return _state;
    }
});

WebsocketStore.dispatchToken = Dispatcher.register(function(payload) {
    var action = payload.action;
    var json = payload.json;
    var error = payload.error;

    switch(action) {
        case Constants.GET_STATE:
            _error = null;
            setState(json);
            WebsocketStore.emitChange();
            break;
    }
});
module.exports = WebsocketStore;
