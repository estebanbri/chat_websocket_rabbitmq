import React from 'react';
import "./ReglamentoModal.css"
import { Button, Modal,  ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const reglamentoModal = ( props )  =>{
        // la property toggle es la equis que aparece para cerrar el modal
        return (

            <Modal isOpen={props.estaAbierto}>

                <ModalHeader toggle={props.miToggleModal}> 
                    Reglas del chat 
                </ModalHeader>

                <ModalBody>
                    <p>Recuerda </p>
                    <ul>
                        <li><span className="reglamento">Cuida tu ortografía y gramática. El sentido de las palabras y la forma en que escribes puede interpretarse de diversas formas. </span></li>
                        <li><span className="reglamento">Evita usar mayúsculas, éstas representan un tono de voz alzada.</span></li>
                        <li><span className="reglamento">Mantener la discreción en lo que compartes, recuerda que la información llega a todos los miembros al mismo tiempo.</span></li>
                    </ul>
                </ModalBody>

                <ModalFooter>
                    <Button  color="secondary" onClick={props.miToggleModal}>Close</Button>
                </ModalFooter>

            </Modal>

        );
}

export default reglamentoModal;