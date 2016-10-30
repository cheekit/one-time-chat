import { RECEIVE_MESSAGE } from '../../constants';

function _messageRecieve(message) {
  const type = RECEIVE_MESSAGE;

  return { message, type };
}

function receiveMessage(socket) {
  return dispatch => {
    socket.on('send:message', (data) => dispatch(_messageRecieve(data)));
  };
}

export default receiveMessage;
