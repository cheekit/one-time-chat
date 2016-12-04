import { FirebaseList } from '../firebase';
import * as userActions from './actions';
import { Record } from 'immutable';

export const Member = new Record({
  id: null,
  status: false
});

export const roomMemberList = new FirebaseList({
  onLoad: userActions.loadUsersSuccess
}, Member);
