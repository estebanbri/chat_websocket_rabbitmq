import React, {Component} from 'react';
import './App.css';
import SockJS from "sockjs-client"
import Stomp from 'stompjs'
import WelcomePage from './componentes/WelcomePage/WelcomePage.js'
import ChatPage from './componentes/ChatPage/ChatPage.js'

class  App extends Component {


    constructor(props) {
      super(props);
      this.stompClient = null;
      this.isConnected = false;
      this.wasSend = "";
      this.senders = [];
      this.state = {
        mensaje: {
          sender: '',
          contenido: '',
          tipo: ''
        },
        mensajes: [],
        isLogged: false,
      };
    }

  conexionExitosa = () => {
    console.log("Conectado exitosamente! ...");
    this.isConnected = true;
  }

  leerMensaje = (payload) =>{
    var mensaje = JSON.parse(payload.body);

    if (mensaje.tipo === 'NUEVO_USUARIO') {
      mensaje.contenido = mensaje.sender + ' se ha unido al chat';
    } else if (mensaje.tipo === 'SALIO') {
      mensaje.contenido = mensaje.sender + ' ha salido del chat';
    }

    this.setState({mensajes:[...this.state.mensajes, mensaje]});

    console.log(` Sender: ${mensaje.sender} \n Contenido: ${mensaje.contenido} \n Tipo: ${mensaje.tipo} `);
  }

  updateInput = (event) => {
    var senderIncluded = this.senders.includes(this.state.mensaje.sender);
    this.wasSend = false;
    if(senderIncluded){
      this.setState({
        mensaje:{
          ...this.state.mensaje,
          contenido : event.target.value,
          tipo : 'CHAT'
        }});
    }else{
      this.setState({
        mensaje:{
          ...this.state.mensaje,
          sender : event.target.value,
          tipo : 'NUEVO_USUARIO'
        }});
    }
  }

  handleClick = (event) => {
    const sender = this.state.mensaje.sender;
    if(sender && this.isConnected){
      this.setState({isLogged : true});
      this.stompClient.subscribe('/topic/abc', this.leerMensaje);
      this.stompClient.send("/app/chat.nuevoUsuario", {}, JSON.stringify(this.state.mensaje));
      this.senders.push(sender);
    }
  }

 sendMessage = (event) => {
      this.stompClient.send("/app/chat.enviarMensaje", {}, JSON.stringify(this.state.mensaje));
      this.wasSend = true;
  }

  componentDidMount(){
    const socket = new SockJS('http://localhost:9090/websocketApp');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.conexionExitosa);
  }

  render(){
    return (
      <div className="App">
        { this.state.isLogged 
          ? <ChatPage enviado={this.wasSend} clic={this.sendMessage} cambio={this.updateInput} mensajes={this.state.mensajes}/>
          : <WelcomePage clic={this.handleClick} cambio={this.updateInput}/>
        }
      </div>
    );
  }
}

export default App;
