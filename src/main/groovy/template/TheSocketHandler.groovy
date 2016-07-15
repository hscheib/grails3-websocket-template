package template

import org.springframework.web.socket.*

class TheSocketHandler implements WebSocketHandler {

    @Override
    void afterConnectionEstablished(WebSocketSession session) throws Exception {
        println "CONNECTION ESTABLISHED ${session.id}"
        session.sendMessage(new TextMessage("ID ${session.id} has joined!"))
    }

    @Override
    void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        println "HANDLING ${message?.payload}"
        session.sendMessage(new TextMessage("ID ${session.id}: ${message?.payload}"))
    }

    @Override
    void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        println "EXCEPTION $exception"
    }

    @Override
    void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        println "CLOSED: $closeStatus"

    }

    @Override
    boolean supportsPartialMessages() {
        return false
    }

}
