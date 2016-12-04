import { messageList } from './message-list';
import {
  UNLOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_SUCCESS,
  CREATE_MESSAGE_ERROR,
  CREATE_MESSAGE_SUCCESS
} from './action-types';
import { Message } from './message';

export function createJoinMessage(name) {
  return dispatch => {
    const message = new Message({ body: {content: `${name} joined` }});
    return dispatch(createMessage(message, true));
  };
}

export function createLeftMessage(name) {
  return dispatch => {
    const message = new Message({ body: {content: `${name} leaved`}});
    return dispatch(createMessage(message, true));
  };
}

export function createMessage(message, system = false) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const from = system === true ? 'system' : auth.id;
    const newMessage = message.set('from', from);

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
