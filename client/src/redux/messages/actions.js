import { messageList } from './message-list';
import {
  UNLOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_SUCCESS
} from './action-types';

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
