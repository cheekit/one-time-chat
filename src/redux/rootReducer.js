import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { channelsReducer } from './channels';
import { messagesReducer } from './messages';
import { roomMemberReducer } from './users';

const rootReducer = combineReducers({
  auth: authReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  roomMembers: roomMemberReducer
});

export default rootReducer;
