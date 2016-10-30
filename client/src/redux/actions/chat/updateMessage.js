import { UPDATE_MESSAGE } from '../../constants';

function _messageRecieve(message) {
  const type = UPDATE_MESSAGE;


  return { message, type };
}

function updateMessage(socket, store) {
  return dispatch => {
    socket.on('send:message', (data) => dispatch(_messageRecieve(data)));
  };
}

export default updateMessage;
