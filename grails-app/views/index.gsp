<!doctype html>
<head>
    <title>Websocketzr</title>
    <asset:javascript src="jquery-2.2.0.min.js"/>
    <asset:javascript src="application.js"/>
    <asset:link rel="icon" href="favicon.ico" type="image/x-ico"/>

</head>

<body>
<button class="btn btn-primary btn-xs" id="connectButton" onclick="openSocket()">Connect</button>
<button class="btn btn-primary btn-xs" disabled id="disconnectButton" onclick="closeSocket()">Disconnect</button>
<button class="btn btn-primary btn-xs" disabled id="sendMessage" onclick="sendMessage()">Send Message</button>
<input type="text" id="message"/>

<table style="font:12px Consolas;">
    <tbody id="eventsTable"></tbody>
</table>

<div id="root"></div>
<asset:javascript src="dist/websocket-template.js"/>

</body>
</html>
