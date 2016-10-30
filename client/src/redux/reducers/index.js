import { combineReducers } from 'redux';
import socketsReducer from './socketsReducer';

const rootReducer = combineReducers({
  socketsReducer,
});

export default rootReducer;
