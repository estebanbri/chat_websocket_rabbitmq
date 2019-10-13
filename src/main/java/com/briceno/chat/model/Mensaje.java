package com.briceno.chat.model;

public class Mensaje {

    private String tipo; // diferencia si es un mensaje de chat o un mensaje de que un nuevo usaurio se ha unido al chat
    private String contenido;
    private String sender; // que cliente esta enviando el mensaje

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
