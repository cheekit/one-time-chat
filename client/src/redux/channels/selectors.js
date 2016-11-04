import { createSelector } from 'reselect';


export function getChannels(state) {
  return state.channels;
}

export function getChannelList(state) {
  return getChannels(state).list;
}

export function getChannelFilter(state) {
  return getChannels(state).filter;
}

export function getDeletedChannel(state) {
  return getChannels(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleChannels = createSelector(
  getChannelList,
  getChannelFilter,
  (channels, filter) => {
    switch (filter) {
      case 'active':
        return channels.filter(channel => !channel.completed);

      case 'completed':
        return channels.filter(channel => channel.completed);

      default:
        return channels;
    }
  }
);
