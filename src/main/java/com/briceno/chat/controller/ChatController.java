package com.briceno.chat.controller;

import com.briceno.chat.component.MalasPalabrasCheckInWebSocketSession;
import com.briceno.chat.model.Mensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;



@Controller
public class ChatController {

    @Autowired
    MalasPalabrasCheckInWebSocketSession malaspalabrasCheck; // Bean mantenido vivo durante la session websocket para cada usuario

    // Message Handling: MENSAJE STOMP SEND
    //   +-----------------------------------------------------
    //   | SEND                                                | -> Anotacion que se usa para SEND FRAMES: @MessageMapping
    //   | destination: /chat.enviarMensaje                    |
    //   | {tipo: "CHAT", contenido: "Hola", sender: "Ignacio"}|
    //   +-----------------------------------------------------+

    // /app/chat.enviarMensaje
    @MessageMapping("/chat.enviarMensaje")
    @SendTo("/topic/abc")
    public Mensaje enviarMensaje(@Payload Mensaje mensaje){
        Mensaje mensajeChequeado = malaspalabrasCheck.chequear(mensaje);
        return mensajeChequeado; // el mensaje retornado va a ser enviado a /topic/abc definido en @SendTo
    }

    // Message Handling: MENSAJE STOMP SEND
    //   +----------------------------------------------------------+
    //   | SEND                                                     | -> Anotacion que se usa para SEND FRAMES: @MessageMapping
    //   | destination: /chat.nuevoUsuario                          |
    //   | {tipo: "NUEVO_USUARIO", contenido: {}, sender: "Ignacio"}|
    //   +----------------------------------------------------------+

    // /app/chat.nuevoUsuario
    @MessageMapping("/chat.nuevoUsuario")
    @SendTo("/topic/abc")
    public Mensaje nuevoUsuario(@Payload Mensaje mensaje, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("usuario", mensaje.getSender());
        return mensaje; // el mensaje retornado va a ser enviado a /topic/abc definido en @SendTo // con esto vamos a avisar a los demas usuarios que se ha unido el nuevo usuario
    }

    // @SubscribeMapping sirve para mensaje o frames SUBSCRIBE
}
