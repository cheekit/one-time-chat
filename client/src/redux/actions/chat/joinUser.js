import { JOIN_USER } from '../../constants';

function joinUser(socket) {
  const type = JOIN_USER;

  return dispatch => {
    socket.on('user:join', (user) => dispatch({ user, type }));
  };
}

export default joinUser;
