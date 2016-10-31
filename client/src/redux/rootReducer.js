import { combineReducers } from 'redux';
import { socketsReducer } from './chat';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  auth: authReducer,
  socketsReducer,
});

export default rootReducer;
