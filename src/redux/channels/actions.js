// import { getDeletedTask } from './selectors';
import { firebaseDb } from '../firebase/firebase';
import { deleteMessages, unloadMessages } from '../messages/actions';
import { channelList } from './channel-list';
import {
  CREATE_CHANNEL_ERROR,
  CREATE_CHANNEL_SUCCESS,
  UPDATE_CHANNEL_ERROR,
  UPDATE_CHANNEL_SUCCESS,
  UNLOAD_CHANNELS_SUCCESS,
  LOAD_CHANNELS_SUCCESS,
  DELETE_CHANNEL_ERROR,
  DELETE_CHANNEL_SUCCESS,
} from './action-types';
import { Channel } from './channel';

export function loadChannel(key) {
  return new Promise((resolve) => {
    const path = `channels/${key}`;
    firebaseDb.ref(path)
      .once('value', (result) => {
        if(result.val()) {
          const channel = new Channel(Object.assign({}, result.val(), {key: result.key}));
          channelList.path = 'channels';
          resolve(channel);
        }
        resolve();
      });
  });
}

export function createChannel(channel) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const newChannel = channel.set('userUid', auth.id);
    return channelList.push(newChannel.toJS())
      .catch(error => dispatch(createChannelError(error)));
  };
}

export function createChannelError(error) {
  return {
    type: CREATE_CHANNEL_ERROR,
    payload: error
  };
}

export function createChannelSuccess(channel) {
  return {
    type: CREATE_CHANNEL_SUCCESS,
    payload: channel
  };
}

export function updateChannelError(error) {
  return {
    type: UPDATE_CHANNEL_ERROR,
    payload: error
  };
}

export function updateChannel(channel, changes) {
  return dispatch => {
    channelList.update(channel.key, changes)
      .catch(error => dispatch(updateChannelError(error)));
  };
}

export function updateChannelSuccess(channel) {
  return {
    type: UPDATE_CHANNEL_SUCCESS,
    payload: channel
  };
}

export function loadChannelsSuccess(channels) {
  return {
    type: LOAD_CHANNELS_SUCCESS,
    payload: channels
  };
}

export function loadChannels() {
  return (dispatch) => {
    channelList.path = `channels`;
    channelList.subscribe(dispatch);
  };
}

export function loadOwnChannels() {
  return (dispatch, getState) => {
    const { auth } = getState();
    channelList.path = `channels/${auth.id}`;
    channelList.subscribe(dispatch);
  };
}

export function unloadChannels() {
  channelList.unsubscribe();
  return {
    type: UNLOAD_CHANNELS_SUCCESS
  };
}

export function deleteChannel(channel) {
  return (dispatch) => {
    channelList.remove(channel.key)
      .then(() => {
        Promise.all([
          unloadMessages(),
          deleteMessages(channel.key)
        ]);
      })
      .catch(error => dispatch(deleteChannelError(error)));
  };
}

export function deleteChannelError(error) {
  return {
    type: DELETE_CHANNEL_ERROR,
    payload: error
  };
}

export function deleteChennelSuccess(channel) {
  return {
    type: DELETE_CHANNEL_SUCCESS,
    payload: channel
  };
}
