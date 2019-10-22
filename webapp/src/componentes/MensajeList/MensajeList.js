import React from 'react';
import './MensajeList.css'
import MensajeItem from '../MensajeItem/MensajeItem.js'

const mensajeList = (props) => {
    return (
        <div>
            <ul id="messageList">
                 {
                     (props.mensajes.length !== 0)
                     ?
                        props.mensajes.map(mensaje =>
                        <MensajeItem
                            sender={mensaje.sender}
                            contenido={mensaje.contenido}
                            tipo={mensaje.tipo}/>
                        ) 
                    : null
                }
            </ul>
        </div>
    );
}

export default mensajeList;

// key={mensaje.id}