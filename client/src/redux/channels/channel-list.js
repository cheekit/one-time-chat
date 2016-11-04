import { FirebaseList } from '../firebase';
import * as channelActions from './actions';
import { Channel } from './channel';

export const channelList = new FirebaseList({
  onAdd: channelActions.createChannelSuccess,
  // onChange: channelActions.updateTaskSuccess,
  // onLoad: channelActions.loadTasksSuccess,
  // onRemove: channelActions.deleteTaskSuccess
}, Channel);
