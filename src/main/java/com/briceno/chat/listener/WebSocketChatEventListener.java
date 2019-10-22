package com.briceno.chat.listener;

import com.briceno.chat.model.Mensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

// This class listens to events such as a new user joining the chat or an user leaving the chat.
@Component
public class WebSocketChatEventListener {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate; // Equivale a un RestTemplate pero este nos sirve para interactuar con el broker en este caso RabbitMQ

    @EventListener
    public void manejarEventoConexion(SessionConnectedEvent eventoConexion){
        System.out.println("Se recibio una nueva conexion web socket ... !");
    }

    @EventListener
    public void manejarEventoDesconexion(SessionDisconnectEvent eventoDesconexion){
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(eventoDesconexion.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("usuario");
        if(username != null){
            Mensaje mensaje = new Mensaje();
            mensaje.setTipo("SALIO");
            mensaje.setSender(username);

            messagingTemplate.convertAndSend("/topic/abc", mensaje); // cuando un usuario se va del chat con esto le avisamos a los demas clientes es decir va a ser published to all clients fordwarding este mensaje al broker
        }
    }
}
