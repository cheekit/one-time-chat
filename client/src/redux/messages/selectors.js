import { createSelector } from 'reselect';

export function getMessages(state) {
  return state.messages;
}

export function getMessageList(state) {
  return getMessages(state).list;
}

export function getMessageFilter(state) {
  return getMessages(state).filter;
}

export function getDeletedMessage(state) {
  return getMessages(state).deleted;
}
