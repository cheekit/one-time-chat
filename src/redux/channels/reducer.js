import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from '../auth';

import {
  CREATE_CHANNEL_SUCCESS,
  LOAD_CHANNELS_SUCCESS,
  UPDATE_CHANNELS_SUCCESS,
  DELETE_CHANNEL_SUCCESS,
  // FILTER_TASKS,
} from './action-types';

export const ChannelState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function channelsReducer(state = new ChannelState(), {payload, type}) {
  console.log(payload);

  switch (type) {
    case CREATE_CHANNEL_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });
    case DELETE_CHANNEL_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(channel => channel.key !== payload.key)
      });
    case LOAD_CHANNELS_SUCCESS:
      return state.set('list', new List(payload.reverse()));
    case UPDATE_CHANNELS_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
          state.previous :
          state.list.unshift(payload)
      });
    case SIGN_OUT_SUCCESS:
      return new ChannelState();
    default:
      return state;
  }
}
