import { firebaseDb } from '../firebase/firebase';
import { roomMemberList } from './room-member-list';
import { User } from './user';
import {
  UNLOAD_USERS_SUCCESS,
  LOAD_USERS_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS
} from './action-types';

export function addUser(user) {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      id: user.uid,
      name: user.displayName,
      photoUrl: user.photoURL,
    });

    const path = `users/${newUser.id}`;
    firebaseDb.ref(path)
      .set(newUser.toJS(), error => error ? reject(error) : resolve());
  });
}

export function createUser(user) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const newUser = user.set('id', auth.id);

    return roomMemberList.push(newUser.toJS())
      .catch(error => dispatch(createUserError(error)));
  };
}

export function createUserError(error) {
  return {
    type: CREATE_USER_ERROR,
    payload: error
  };
}

export function createUserSuccess(user) {
  return {
    type: CREATE_USER_SUCCESS,
    payload: user
  };
}

export function loadUsersSuccess(users) {
  return {
    type: LOAD_USERS_SUCCESS,
    payload: users
  };
}

export function loadRoomMembers(key) {
  return (dispatch) => {
    roomMemberList.path = `channels/${key}/members`;
    roomMemberList.subscribe(dispatch);
  };
}

export function unloadRoomMembers() {
  roomMemberList.unsubscribe();
  return {
    type: UNLOAD_USERS_SUCCESS
  };
}
