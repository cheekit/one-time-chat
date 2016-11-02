import React, { PropTypes, Component } from 'react';
import './root.css';

const propTypes = {
  dispatch: PropTypes.func,
  sockets: PropTypes.object,
};

class Root extends Component {
  render() {
    return (
      <div>
        <h1>Root</h1>
        <p> After it'll be show chat rooms</p>

        <h2>Todo</h2>
        <ul>
          <li>Add Room</li>
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
    );
  }
}

Root.propTypes = propTypes;

export default Root;
