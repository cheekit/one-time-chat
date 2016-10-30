import update from 'react-addons-update';
import {
  INITIALIZE_SOCKET,
  RECEIVE_MESSAGE,
  UPDATE_USER,
  JOIN_USER,
  LEFT_USER,
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
    case UPDATE_USER:
      return update(state, {
        sockets: {
          users: {$set: action.users} ,
          name: {$set: action.name},
        }
      });
    case RECEIVE_MESSAGE:
      return update(state, {
        sockets: {
          messages: {$push: action.message}
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
    default:
      return state;
  }
}

export default socketsReducer;
