import React, { PropTypes } from 'react';
import { List } from 'immutable';

import './ChannelList.css';

const propTypes = {
	channels: PropTypes.instanceOf(List).isRequired,
  // deleteChannel: PropTypes.func.isRequired,
  // updateChannel: PropTypes.func.isRequired
};

function ChannelList({channels}) {
  const channelItems = channels.map((channel, index) => {
		const { name, purpose } = channel;

    return (
			<div key={index} className="channel">
				<div className="border-box">
					<h1>{name}</h1>
					<h4>{purpose}</h4>
					<div className="buttom">
						<div className="circle">
							<span>{9}</span>
							<span>menber</span>
						</div>
					</div>
				</div>
			</div>
    );
  });

  return (
    <div className="channel-list">
      {channelItems}
    </div>
  );
}

ChannelList.propTypes = propTypes;
export default ChannelList;
