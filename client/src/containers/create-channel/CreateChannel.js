import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { channelActions } from '../../redux/channels';
import { Toggle, TextField, FlatButton } from 'material-ui';

import './CreateChannel.css';

const propTypes = {
  loadChannels: PropTypes.func.isRequired,
  unloadChannels: PropTypes.func.isRequired,
  createChannel: PropTypes.func.isRequired,
};

function initChannel() {
  return {
    private: false,
    name: '',
    purpose: '',
  };
}

class CreateChannel extends Component {
  state = {
    channel: initChannel(),
  }

  componentDidMount() {
    this.props.loadChannels();
  }

  componentWillUnmount() {
    this.props.unloadChannels();
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
    const { createChannel } = this.props;
    const { channel } = this.state;

    createChannel(channel);

    this.setState({
      channel: initChannel(),
    });
  }

  renderInputText(key, label, hint, value, errorText, validation){
    const textFieldStyle = {
      style: {
        width: '100%',
      },
      floatingLabel: {
        color: '#ccc',
      },
      inputStyle: {
        color: '#fff',
      },
      hintStyle: {
        color: '#ccc',
      },
      floatingLabelFocus: {
        color: '#2ab27b',
      },
      underlineFocus: {
        borderColor: '#2ab27b',
      }
    };

    return (
      <li key={key}>
        <TextField
          style={textFieldStyle.style}
          value={value}
          hintText={hint}
          floatingLabelText={label}
          inputStyle={textFieldStyle.inputStyle}
          floatingLabelStyle={textFieldStyle.floatingLabel}
          hintStyle={textFieldStyle.hintStyle}
          floatingLabelFocusStyle={textFieldStyle.floatingLabelFocus}
          underlineFocusStyle={textFieldStyle.underlineFocus}
          onBlur={(e) => {
            e.preventDefault();
            throw 'error';
          }}
          onChange={(e) => {
            this.handleUpdate(key, e.target.value);
          }}
          errorText={errorText}
        />
      </li>
    );
  }

  render() {
    const { channel } = this.state;
    const toggleLabel = channel.private ? 'Private' : 'Public';

    const toggleStyle = {
      thumbSwitched: {
        backgroundColor: '#2ab27b',
      },
      trackSwitched: {
        backgroundColor: '#95D9BE',
      },
      labelStyle: {
        color: 'white',
      }
    };

    const inputList = [
      {
        key: 'name',
        label: 'Name',
        hint: 'Please fill in a channel name',
        value: channel.name,
        errorText: 'duplicate name',
        validation: (name) => false,
      },
      {
        key: 'purpose',
        label: 'Purpose: (optional)',
        hint: "what's this channel about?",
        value: channel.purpose,
      },
    ];

    return (
      <div className='contents'>
        <div className="channel_modal">
          <div className="channel_modal_header">
            <h1>Create a channel</h1>
            <p className="input_note_special medium_bottom_margin"></p>
          </div>
          <div className="channel_modal_content">
            <Toggle
              defaultToggled={channel.private}
              label={toggleLabel}
              labelPosition="right"
              thumbSwitchedStyle={toggleStyle.thumbSwitched}
              trackSwitchedStyle={toggleStyle.trackSwitched}
              labelStyle={toggleStyle.labelStyle}
              onToggle={(e, logged) => this.handleUpdate('private', logged)}
            />
            <ul className="input_list">
              {inputList.map((item) => (
                this.renderInputText(
                  item.key,
                  item.label,
                  item.hint,
                  item.value,
                  item.errorText,
                  item.validation
                ))
              )}
            </ul>
            <div className="bottom_area">
              <FlatButton
                style={{color: "white", border: '1px solid white', height: '40px'}}
                label={'Create Channel'}
                labelPosition="after"
                primary={true}
                onClick={this.handleSubmit}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateChannel.propTypes = propTypes;

export default connect(null, channelActions)(CreateChannel);
