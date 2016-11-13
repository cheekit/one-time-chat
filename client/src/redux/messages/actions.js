import { messageList } from './message-list';
import {
  UNLOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_SUCCESS,
  CREATE_MESSAGE_ERROR,
  CREATE_MESSAGE_SUCCESS
} from './action-types';

export function createMessage(message) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const newMessage = message.set('from', auth.id);

    return messageList.push(newMessage.toJS())
      .catch(error => dispatch(createMessageError(error)));
  };
}

export function createMessageError(error) {
  return {
    type: CREATE_MESSAGE_ERROR,
    payload: error
  };
}

export function createMessageSuccess(message) {
  return {
    type: CREATE_MESSAGE_SUCCESS,
    payload: message
  };
}

export function loadMessagesSuccess(messages) {
  return {
    type: LOAD_MESSAGES_SUCCESS,
    payload: messages
  };
}

export function loadMessages(channelKey) {
  return (dispatch) => {
    messageList.path = `messages/${channelKey}`;
    messageList.subscribe(dispatch);
  };
}

export function unloadMessages() {
  messageList.unsubscribe();
  return {
    type: UNLOAD_MESSAGES_SUCCESS
  };
}
