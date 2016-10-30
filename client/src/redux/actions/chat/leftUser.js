import { LEFT_USER } from '../../constants';

function leftUser(socket) {
  const type = LEFT_USER;

  return dispatch => {
    socket.on('user:left', (user) => dispatch({ user, type }));
  };
}

export default leftUser;
