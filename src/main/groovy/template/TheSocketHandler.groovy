package template

import org.springframework.web.socket.*

class TheSocketHandler implements WebSocketHandler {
    private final static Map sockets = [:]

    @Override
    void afterConnectionEstablished(WebSocketSession session) throws Exception {
        println "CONNECTION ESTABLISHED ${session.id}"
        sockets.put(session.id, session)
        sendToAllSessions(new TextMessage("ID ${session.id} has joined!"))
    }

    @Override
    void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        println "HANDLING ${message?.payload}"
        sendToAllSessions(new TextMessage("ID ${session.id}: ${message?.payload}"))
    }

    @Override
    void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        println "EXCEPTION $exception"
    }

    @Override
    void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        println "CLOSED: $closeStatus"
        sockets.remove(session.id)
    }

    @Override
    boolean supportsPartialMessages() {
        return false
    }

    private sendToAllSessions(TextMessage textMessage) {
        sockets.each { k,v ->
            v.sendMessage(textMessage)
        }
    }
}
