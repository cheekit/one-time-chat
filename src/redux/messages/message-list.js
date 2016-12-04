import { FirebaseList } from '../firebase';
import * as messageActions from './actions';
import { Message } from './message';

export const messageList = new FirebaseList({
  onAdd: messageActions.createMessageSuccess,
  // onChange: channelActions.updateTaskSuccess,
  onLoad: messageActions.loadMessagesSuccess,
  // onRemove: messageActions.deleteMessageSuccess
}, Message);
