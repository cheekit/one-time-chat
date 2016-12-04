import { loadChannel, updateChannel } from '../channels/actions';
import { createJoinMessage } from '../messages/actions';

export function joinChannel({ channelKey, name, id, router }) {
  return (dispatch) => {
    loadChannel(channelKey).then((channel) => {
      if(channel === undefined) {
        router.replaceWith('/');
      }else {
        if(channel.members[id] === undefined) {
          dispatch(createJoinMessage(name));
        }

        const members = channel.members;

        members[id] = {
          id: id,
          status: true
        };

        dispatch(updateChannel(channel, { members }));
      }
    });
  };
}
