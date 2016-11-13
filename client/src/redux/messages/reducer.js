import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from '../auth';

import {
  CREATE_MESSAGE_SUCCESS,
  LOAD_MESSAGES_SUCCESS
} from './action-types';

export const MessageState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function messagesReducer(state = new MessageState(), {payload, type}) {
  switch (type) {
    case CREATE_MESSAGE_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });
    case LOAD_MESSAGES_SUCCESS:
      return state.set('list', new List(payload.reverse()));
    case SIGN_OUT_SUCCESS:
      return new MessageState();
    default:
      return state;
  }
}
