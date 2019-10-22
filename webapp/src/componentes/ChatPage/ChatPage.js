import React from 'react';
import './ChatPage.css'
import MensajeList from '../MensajeList/MensajeList.js'
import { IoMdSend } from "react-icons/io";
import { IoMdChatbubbles } from "react-icons/io";
import { IconContext } from "react-icons";

const  chatPage = ( props ) => {
    return (
        <div id="dialogue-page">
            <div className="dialogue-container">
                <div className="dialogue-header">
                    <h2>
                        <span> Sala de chat </span>
                        <IconContext.Provider value={{ color: "#ecfcff" }}>
                            <IoMdChatbubbles/>
                        </IconContext.Provider>
                    </h2>
                </div>
                <MensajeList mensajes={props.mensajes}/>
                <form id="dialogueForm" className="dialogue-form">
                    <div className="form-group">
                        <div className="input-group">
                            <input value={props.enviado?"":null} onChange={props.cambio}  type="text" id="chatMessage"
                                  placeholder="Escriba un mensaje...." autoComplete="off"
                                  className="form-control" />
                                  </div>
                            <button className="btn btn-success" onClick={props.clic} type="button">
                                Enviar <IoMdSend/>
                            </button>
                    </div>
                </form>
            </div>
        </div>  
    );
}

export default chatPage;