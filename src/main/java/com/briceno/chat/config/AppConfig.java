package com.briceno.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class AppConfig implements WebSocketMessageBrokerConfigurer {

    // El cliente primero tiene que hitter este endpoint /websocketApp y recien despues de esto va a poder intercambiar STOMP messages dentro de esta application
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Entry point de request que vengan desde el FrontEnd al Backend
        // http://localhost:9090/websocketApp
        registry.addEndpoint("/websocketApp").withSockJS(); // register this application con el nombre de websocketApp aqui es donde van a hittear los clientes para subscribirse al broker, los clientes no pueden ir a hittear directamente al servidor rabbitMq
    }

    // Configuramos el broker que vamos a usar
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app"); // cualquier mensaje que tenga /app en la URL va a ser ruteado a los metodos anotados con @MessageMapping dentro del controller
        registry.enableStompBrokerRelay("/topic") // cualquier mensaje que tenga /topic en la URL va a ser enviado a este broker
                .setRelayHost("localhost")
                .setRelayPort(61613)
                .setClientLogin("guest")
                .setClientPasscode("guest");
    }
}
