import update from 'react-addons-update';
import {
  INITIALIZE_SOCKET,
  RECEIVE_MESSAGE,
  INIT_USER,
  JOIN_USER,
  LEFT_USER,
  SEND_MESSAGE,
} from '../constants';

const initState = () => {
  return {
    sockets: {
      socket: {},
      users: [],
      name: '',
      messages: [],
    }
  };
};

const systemName = 'APPLICATION BOT';

function socketsReducer(state = initState(), action) {
  switch (action.type) {
    case INITIALIZE_SOCKET:
      return update(state, {
        sockets: {
          socket: {$set: action.socket}
        }
      });
    case INIT_USER:
      return update(state, {
        sockets: {
          users: {$set: action.users} ,
          name: {$set: action.name},
          messages: {$push: [{ user: systemName, message: `Hello ${action.name} !!`}]}
        }
      });
    case RECEIVE_MESSAGE:
      return update(state, {
        sockets: {
          messages: {$push: [action.message]}
        }
      });
    case JOIN_USER:
      return update(state, {
        sockets: {
          users: {$push: [action.user.name]},
          messages: {$push: [{ user: systemName, message: `${action.user.name} Joined`}]}
        }
      });
    case LEFT_USER:
      return update(state, {
        sockets: {
          users: {$splice: [[state.sockets.users.indexOf(action.user.name), 1]]},
          messages: {$push: [{ user: systemName, message: `${action.user.name} Left`}]}
        }
      });
    case SEND_MESSAGE:
      state.sockets.socket.emit('send:message', action.message);
      return update(state, {
        sockets: {
          messages: {$push: [{ user: action.user, message: action.message}]}
        }
      });
    default:
      return state;
  }
}

export default socketsReducer;
