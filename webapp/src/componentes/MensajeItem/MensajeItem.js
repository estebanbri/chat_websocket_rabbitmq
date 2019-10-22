import React from 'react';
import './MensajeItem.css'
import { MdPerson } from "react-icons/md";
import { IoIosArrowUp , IoIosArrowDown }  from "react-icons/io";
import { IconContext } from "react-icons";

const mensajeItem = (props) => {

    const clazz = (props.tipo === 'CHAT')? "message-data" : "event-data" ;
    const isConnected = (props.tipo === 'NUEVO_USUARIO')? true : false ;
    
    let connected = <li className={clazz}>
                        <p> 
                            <MdPerson/>
                            <IconContext.Provider value={{ className: "text-success" }}>
                                <IoIosArrowUp/> {props.contenido} 
                            </IconContext.Provider>
                        </p> 
                    </li>

    let disconnected = <li className={clazz}>
                            <p>
                                <MdPerson/>
                                <IconContext.Provider value={{ className: "text-danger" }}>
                                    <IoIosArrowDown/> {props.contenido}                             
                                </IconContext.Provider>
                            </p>
                       </li>

    return (
        <div>
            {
                (clazz === "event-data")
            ?
                isConnected ? connected : disconnected 
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