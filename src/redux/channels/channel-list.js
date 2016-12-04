import { FirebaseList } from '../firebase';
import * as channelActions from './actions';
import { Channel } from './channel';

export const channelList = new FirebaseList({
  onAdd: channelActions.createChannelSuccess,
  onChange: channelActions.updateChannelSuccess,
  onLoad: channelActions.loadChannelsSuccess,
  onRemove: channelActions.deleteChannelSuccess
}, Channel);
