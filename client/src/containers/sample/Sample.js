import React, { PropTypes } from 'react';
import SizeMe from 'react-sizeme';

import './sample.css';


const propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

function Sample() {

  return (
    <div className="Sample">
      <div className="Sample-header">
        <h2>Sample</h2>

        <h2>Todo</h2>
        <ul>
          <li><strike>Add Room</strike></li>
          <li>Show Rooms</li>
          <li>Join Rooms</li>
          <li>Send Message (text)</li>
          <li>Send Message (image)</li>
          <li>Send Message (link)</li>
          <li>Edit Message</li>
          <li>Delete Message</li>
          <li>Close room after 15 minutes</li>
        </ul>
      </div>
    </div>
  );
}

Sample.propTypes = propTypes;

export default SizeMe()(Sample);
