import { INIT_USER } from '../../constants';

function update(data) {
  const { users, name } = data;
  const type = INIT_USER;

  return { users, name, type };
}

function initUser(socket) {

  return dispatch => {
    socket.on('init', (data) => dispatch(update(data)));
  };
}

export default initUser;
