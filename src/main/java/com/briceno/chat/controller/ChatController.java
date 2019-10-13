package com.briceno.chat.controller;

import com.briceno.chat.model.Mensaje;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;


@Controller
public class ChatController {

    // /app/chat.enviarMensaje
    @MessageMapping("/chat.enviarMensaje")
    @SendTo("/topic/abc")
    public Mensaje enviarMensaje(@Payload Mensaje mensaje){
        return mensaje; // el mensaje retornado va a ser enviado a /topic/abc definido en @SendTo
    }

    // /app/chat.nuevoUsuario
    @MessageMapping("/chat.nuevoUsuario")
    @SendTo("/topic/abc")
    public Mensaje nuevoUsuario(@Payload Mensaje mensaje, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("username", mensaje.getSender()); // con esto vamos a avisar a los demas usuarios que se ha unido el nuevo usuario
        return mensaje; // el mensaje retornado va a ser enviado a /topic/abc definido en @SendTo
    }


}
