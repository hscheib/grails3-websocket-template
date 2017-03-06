var Constants = require('../constants');
var Dispatcher = require('../dispatcher/dispatcher');

var socket = null

function openSocket() {
    socket = new WebSocket("ws://localhost:8080/socket");

    socket.onmessage = function (message) {
        WebsocketActions.setState(message.data);
    };
    socket.onclose = function (event) {
        console.log("socket closed ", event.code);
    };
    socket.onerror = function () {
    };
}

function sendMessage(message) {
    if(socket === null) {
        openSocket();
    } else {
        socket.send(message);
    }
}

function closeSocket() {
    socket.close();
}

var WebsocketActions = {
    setState: function(state) {
        Dispatcher.dispatch({
            action: Constants.GET_STATE,
            json: state
        });
    },
    sendMessage: function(message) {
        sendMessage(message);
    },
    connect: function() {
        openSocket();
    },
    disconnect: function() {
        closeSocket();
    }
};

module.exports = WebsocketActions;
