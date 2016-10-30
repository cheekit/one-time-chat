import { UPDATE_USER } from '../../constants';

function _initialize(data) {
  const { users, name } = data;
  const type = UPDATE_USER;

  return { users, name, type };
}

function initUser(socket) {

  return dispatch => {
    socket.on('init', (data) => dispatch(_initialize(data)));
  };
}

export default initUser;
