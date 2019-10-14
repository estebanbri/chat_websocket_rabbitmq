package com.briceno.chat.component;

import com.briceno.chat.model.Mensaje;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

@Component
@Scope(scopeName = "websocket", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class MalasPalabrasCheckInWebSocketSession {

    private Integer numeroAviso = 3;

    public Mensaje chequear(Mensaje mensaje){
        if(mensaje.getContenido().equals("PELOTUDO")){
           mensaje.setContenido("NO DIGAS MALASPALABRAS! Te restan " + --numeroAviso + " avisos");
        }
        if(numeroAviso == 0){
            mensaje.setTipo("SALIO");
            // TODO implementar desconexion
        }
        return mensaje;
    }
}
