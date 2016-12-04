import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { channelsReducer } from './channels';
import { messagesReducer } from './messages';

const rootReducer = combineReducers({
  auth: authReducer,
  channels: channelsReducer,
  messages: messagesReducer
});

export default rootReducer;
