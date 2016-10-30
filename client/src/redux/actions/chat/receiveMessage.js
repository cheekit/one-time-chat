import { RECEIVE_MESSAGE } from '../../constants';

function receiveMessage(socket) {
  const type = RECEIVE_MESSAGE;

  return dispatch => {
    socket.on('send:message', (message) => dispatch({ message, type }));
  };
}

export default receiveMessage;
