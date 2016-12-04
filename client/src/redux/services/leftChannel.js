import { loadChannel, updateChannel } from '../channels/actions';
import { createLeftMessage } from '../messages/actions';

export function leftChannel({ channelKey, name, id }) {
  return (dispatch) => {
    loadChannel(channelKey).then((channel) => {
      dispatch(createLeftMessage(name));

      const members = channel.members;
      delete members[id];
      console.log(channel);
      console.log(members);
      dispatch(updateChannel(channel, { members }));
    });
  };
}
