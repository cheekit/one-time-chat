import io from 'socket.io-client';
import { SOCKET_IO_URL, INITIALIZE_SOCKET } from '../../constants';
import initUser from './initUser';
import updateMessage from './updateMessage';
import joinUser from './joinUser';
import leftUser from './leftUser';

function initSocket() {
  const socket = io(SOCKET_IO_URL);
  const type = INITIALIZE_SOCKET;

  return dispatch => Promise.all([
    dispatch({ socket, type }),
    dispatch(initUser(socket)),
    dispatch(updateMessage(socket)),
    dispatch(joinUser(socket)),
    dispatch(leftUser(socket)),
  ]);
}

export default initSocket;
