import { SEND_MESSAGE } from '../../constants';

function sendMessage(user, message) {
  const type = SEND_MESSAGE;

  return dispatch => {
    dispatch({ user, message, type });
  };
}

export default sendMessage;
