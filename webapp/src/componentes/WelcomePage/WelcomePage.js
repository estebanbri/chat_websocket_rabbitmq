import React from 'react';
import './WelcomePage.css'
import { IoIosLogIn } from "react-icons/io";

const welcomePage  = ( props ) => {
    // Unicamente permite definir 'const' o 'var' aqui antes del return
    return (
        <div id="welcome-page">
            <div className="welcome-page-container">
              <h1 className="title">Bienvenido </h1>
              <h2>Para unirse al grupo de chat ingrese su nombre</h2>
              <form id="welcomeForm" name="welcomeForm">
                  <div className="form-group">
                      <input onChange={props.cambio} type="text" id="name" placeholder="Nombre" className="form-control" />
                  </div>
                  <div className="form-group">
                      <button className="btn btn-success" onClick={props.clic} type="button">Unirse al chat grupal <IoIosLogIn/></button>
                  </div>
              </form>
          </div>
        </div>
    );
}

export default welcomePage;