var WebsocketActions = require('../actions/websocketActions.js');

var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080/socket');

ws.on('open', function open() {
    ws.send('something');
});

ws.on('message', function(data, flags) {
    WebsocketActions.setState(data);
    // flags.binary will be set if a binary data is received. 
    // flags.masked will be set if the data was masked. 
});