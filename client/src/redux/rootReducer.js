import { combineReducers } from 'redux';
import { socketsReducer } from './chat';
import { authReducer } from './auth';
import { channelsReducer } from './channels';

const rootReducer = combineReducers({
  auth: authReducer,
  channels: channelsReducer,
  socketsReducer,
});

export default rootReducer;
