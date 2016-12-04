import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from '../auth';

import {
  CREATE_USER_SUCCESS,
  LOAD_USERS_SUCCESS,
  UPDATE_USERS_SUCCESS
} from './action-types';


export const UserState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function roomMemberReducer(state = new UserState(), {payload, type}) {
  switch (type) {
    case CREATE_USER_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case LOAD_USERS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_USERS_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
          state.previous :
          state.list.unshift(payload)
      });

    case SIGN_OUT_SUCCESS:
      return new UserState();

    default:
      return state;
  }
}
