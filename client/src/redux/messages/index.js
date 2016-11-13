import * as messageActions from './actions';

export { messageActions };

export * from './action-types';
export { messagesReducer } from './reducer';
export { Message } from './message';
export {
  StringPostBody,
  StampPostBody,
  PostBodyFactory
} from './post-body';
