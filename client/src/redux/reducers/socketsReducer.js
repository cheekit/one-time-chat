import update from 'react-addons-update';
import {
  INITIALIZE_SOCKET,
  UPDATE_USER,
  UPDATE_MESSAGE,
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

function socketsReducer(state = initState(), action) {
  switch (action.type) {
    case INITIALIZE_SOCKET:
      console.log(state);
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
    case UPDATE_MESSAGE:
      return update(state, {
        sockets: {
          messages: {$push: action.message}
        }
      });
    default:
      return state;
  }
}

export default socketsReducer;
