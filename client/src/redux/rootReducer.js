import { combineReducers } from 'redux';
import { socketsReducer } from './chat';

const rootReducer = combineReducers({
  socketsReducer,
});

export default rootReducer;
