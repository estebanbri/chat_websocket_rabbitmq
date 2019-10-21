import React from 'react';
import './MensajeItem.css'
import { IoIosPerson } from "react-icons/io";

const mensajeItem = (props) => {

    const clazz = (props.tipo === 'CHAT')? "message-data" : "event-data" ;

    return (
        <div>
            {
                (clazz === "event-data")
            ?
            <li className={clazz}>
                <p> <IoIosPerson/> {props.contenido} </p> 
            </li>
            :
            <li className={clazz}>
                <i> {props.sender[0]}  </i> 
                <span> {props.sender} dice : </span> 
                <p> {props.contenido} </p> 
            </li>
            }
        </div>
    );
}

export default mensajeItem;