import { FirebaseList } from '../firebase';
import * as messageActions from './actions';
import { Message } from './message';

export const messageList = new FirebaseList({
  // onAdd: messageActions.createChannelSuccess,
  // onChange: channelActions.updateTaskSuccess,
  onLoad: messageActions.loadMessagesSuccess
  // onRemove: channelActions.deleteTaskSuccess
}, Message);
