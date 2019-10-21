'use strict';

document.querySelector('#welcomeForm').addEventListener('submit', connect, true)
document.querySelector('#dialogueForm').addEventListener('submit', sendMessage, true)

var stompClient = null;
var name = null;

function connect(event) {
	name = document.querySelector('#name').value.trim();

	if (name) {
		document.querySelector('#welcome-page').classList.add('hidden');
		document.querySelector('#dialogue-page').classList.remove('hidden');

        // BROWSER --  HTTP    --> SERVER (initial request es http)
        // BROWSER <-- HTTP 101 -- SERVER (el server le responde con HTTP 101 Switching Protocols from HTTP to WS)
        // BROWSER <-- WS      --> SERVER (behind the scenes el Browser termina haciendo todo por WS protocol)
		var socket = new SockJS('http://localhost:9090/websocketApp');
		stompClient = Stomp.over(socket);

		stompClient.connect({}, connectionSuccess);
	}
	event.preventDefault();
}

function connectionSuccess() {
	stompClient.subscribe('/topic/abc', onMessageReceived);

	stompClient.send("/app/chat.nuevoUsuario", {}, JSON.stringify({
		sender : name,
		tipo : 'NUEVO_USUARIO'
	}))

}

function sendMessage(event) {
	var messageContent = document.querySelector('#chatMessage').value.trim();

	if (messageContent && stompClient) {
		var mensaje = {
			sender : name,
			contenido : document.querySelector('#chatMessage').value,
			tipo : 'CHAT'
		};

		stompClient.send("/app/chat.enviarMensaje", {}, JSON
				.stringify(mensaje));
		document.querySelector('#chatMessage').value = '';
	}
	event.preventDefault();
}

function onMessageReceived(payload) {
	var mensaje = JSON.parse(payload.body);

	var messageElement = document.createElement('li');

	if (mensaje.tipo === 'NUEVO_USUARIO') {
		messageElement.classList.add('event-data');
		mensaje.contenido = mensaje.sender + ' se ha unido al chat';
	} else if (mensaje.tipo === 'SALIO') {
		messageElement.classList.add('event-data');
		mensaje.contenido = mensaje.sender + ' ha salido del chat';
	} else {
		messageElement.classList.add('message-data');

		var element = document.createElement('i');
		var text = document.createTextNode(mensaje.sender[0]);
		element.appendChild(text);

		messageElement.appendChild(element);

		var usernameElement = document.createElement('span');
		var usernameText = document.createTextNode(mensaje.sender);
		usernameElement.appendChild(usernameText);
		messageElement.appendChild(usernameElement);
	}

	var textElement = document.createElement('p');
	var messageText = document.createTextNode(mensaje.contenido);
	textElement.appendChild(messageText);

	messageElement.appendChild(textElement);

	document.querySelector('#messageList').appendChild(messageElement);
	document.querySelector('#messageList').scrollTop = document
			.querySelector('#messageList').scrollHeight
			}