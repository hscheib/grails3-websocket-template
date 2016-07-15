var socket = null

function openSocket() {
    socket = new WebSocket("ws://localhost:8080/socket");
    console.log("click");

    socket.onmessage = function (message) {
        // var json = message.data;
        $("#eventsTable").append("<tr><td>" + message.data + "</td></tr>");


    };
    socket.onclose = function () {
        $('#disconnectButton').attr('disabled','disabled');
        $('#connectButton').removeAttr('disabled');
        $('#sendMessage').attr('disabled','disabled');
    }
    socket.onerror = function () {
    }
    $('#disconnectButton').removeAttr('disabled');
    $('#sendMessage').removeAttr('disabled');
    $('#connectButton').attr('disabled','disabled');
}

function sendMessage() {
    if(socket === null) {
        openSocket();
    } else {
        var message = $("#message").val();
        socket.send(message);
    }
}

function closeSocket() {
    socket.close();
    $('#disconnectButton').attr('disabled','disabled');
    $('#connectButton').removeAttr('disabled');
    $('#sendMessage').attr('disabled','disabled');
}