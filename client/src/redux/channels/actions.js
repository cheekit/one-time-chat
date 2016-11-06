// import { getDeletedTask } from './selectors';
import { channelList } from './channel-list';
import {
  CREATE_CHANNEL_ERROR,
  CREATE_CHANNEL_SUCCESS,
  // DELETE_TASK_ERROR,
  // DELETE_TASK_SUCCESS,
  // FILTER_TASKS,
  // UNDELETE_TASK_ERROR,
  // UPDATE_TASK_ERROR,
  // UPDATE_TASK_SUCCESS
  UNLOAD_CHANNELS_SUCCESS,
  LOAD_CHANNELS_SUCCESS
} from './action-types';


export function createChannel(channel) {
  return dispatch => {
    channelList.push(channel)
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

// export function deleteTask(task) {
//   return dispatch => {
//     taskList.remove(task.key)
//       .catch(error => dispatch(deleteTaskError(error)));
//   };
// }
//
// export function deleteTaskError(error) {
//   return {
//     type: DELETE_TASK_ERROR,
//     payload: error
//   };
// }
//
// export function deleteTaskSuccess(task) {
//   return {
//     type: DELETE_TASK_SUCCESS,
//     payload: task
//   };
// }
//
// export function undeleteTask() {
//   return (dispatch, getState) => {
//     const task = getDeletedTask(getState());
//     if (task) {
//       taskList.set(task.key, {completed: task.completed, title: task.title})
//         .catch(error => dispatch(undeleteTaskError(error)));
//     }
//   };
// }
//
// export function undeleteTaskError(error) {
//   return {
//     type: UNDELETE_TASK_ERROR,
//     payload: error
//   };
// }
//
// export function updateTaskError(error) {
//   return {
//     type: UPDATE_TASK_ERROR,
//     payload: error
//   };
// }
//
// export function updateTask(task, changes) {
//   return dispatch => {
//     taskList.update(task.key, changes)
//       .catch(error => dispatch(updateTaskError(error)));
//   };
// }
//
// export function updateTaskSuccess(task) {
//   return {
//     type: UPDATE_TASK_SUCCESS,
//     payload: task
//   };
// }
//
export function loadChannelsSuccess(channels) {
  return {
    type: LOAD_CHANNELS_SUCCESS,
    payload: channels
  };
}
//
// export function filterTasks(filterType) {
//   return {
//     type: FILTER_TASKS,
//     payload: {filterType}
//   };
// }
//
export function loadChannels() {
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
