import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createChannel } from '../../redux/channels';
import { Toggle } from 'material-ui';

import './CreateChannel.css';

const propTypes = {
  dispatch: PropTypes.func,
  channels: PropTypes.object,
};

class CreateChannel extends Component {
  state = {
    channels: {
      list: [],
    },
    channel: {
      private: false,
      channelName: '',
      purpose: '',
      invites: [],
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    const { sockets } = nextProps;

    if (sockets) this.setState({ sockets });
  }

  handleResize = this.handleResize.bind(this);
  handleResize() {
    this.setState({
      height: document.querySelector('.application_content').clientHeight,
    });
  }

  handleUpdate = this.handleUpdate.bind(this);
  handleUpdate(key, value) {
    const updateState = Object.assign({}, this.state.channel);
    updateState[key] = value;
    this.setState({
      channel: updateState
    });
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { message, sockets } = this.state;
    const { name } = sockets;

    dispatch(createChannel(name))

    this.setState({
      message: '',
    });
  }

  renderMessage(user, message, i) {
    const userNameStyle = {
      fontSize: '9px',
      color: '#aaa',
    };
    return (
      <li key={i}>
        <span style={userNameStyle}>{user}</span><br />
        {message}
      </li>
    );
  }

  render() {
    const { channels, channel, height } = this.state;
    console.log(channel);
    const toggleLabel = channel.private ? 'private' : 'public';

    return (
      <div>
        <div className="channel_modal">
          <div>
            <h1 className="channel_modal_header">Create a channel</h1>
            <p className="input_note_special medium_bottom_margin"></p>
          </div>
          <div>
            <Toggle
              label={toggleLabel}
              labelPosition="right"
              onToggle={(e, logged) => this.handleUpdate('private', logged)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { channels } = state.channels;

  return { channels };
}

CreateChannel.propTypes = propTypes;

export default connect(mapStateToProps)(CreateChannel);
