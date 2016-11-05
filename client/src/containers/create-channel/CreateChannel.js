import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { channelActions } from '../../redux/channels';
import { Toggle, TextField, FlatButton } from 'material-ui';
import validator from 'validator';

import './CreateChannel.css';

const propTypes = {
  loadChannels: PropTypes.func.isRequired,
  unloadChannels: PropTypes.func.isRequired,
  createChannel: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object.isRequired,
}

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
    errors: [],
    disabledSubmit: true,
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
    this.context.router.replaceWith('/');
  }

  handleValid = this.handleValid.bind(this);
  handleValid(key, value, validations, prevErrors) {
    const primaryValid = validations.filter(({primary}) => primary === true);
    const primaryErrors = primaryValid.map(({message, valid}) => {
      return valid(value) === true ? '' : message;
    }).filter((error) => error !== '');

    const errors = primaryErrors.length === 0 &&
      validations.map(({message, valid}) => {
       return valid(value) === true ? '' : message;
      }).filter((error) => error !== '');

    const filterErrorsWithoutKey = prevErrors.filter((error) => error.key !== key);
    if(errors.length > 0 || primaryErrors.length > 0) {
      filterErrorsWithoutKey.push({
        key: key,
        message: [primaryErrors, ...errors]
      });
    }

    this.setState({
      errors: filterErrorsWithoutKey,
      disabledSubmit: filterErrorsWithoutKey.length > 0 ? true : false,
    });
  }

  renderInputText(key, label, hint, value, errorText, validations, props){
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
          {...props}
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
            this.handleValid(key, e.target.value, validations, this.state.errors);
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
    const { channel, errors, disabledSubmit } = this.state;
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

    const submitButtonStyle = {
      color: "white",
      border: '1px solid white',
      height: '40px',
      opacity: disabledSubmit ? 0.5 : 1,
    };

    const inputList = [
      {
        key: 'name',
        label: 'Name',
        hint: 'Please fill in a channel name',
        value: channel.name,
        props: {maxLength: 30},
        errorMessage: '',
        validations: [
          {
            message: "Please fill in a channel name.",
            valid: (name) => name !== '',
            primary: true,
          },
          {
            message: "channel names must be between 1 and 30 characters long.",
            valid: (name) => validator.isLength(name, {min:1, max: 30}),
          },
          {
            message: "channel names can't contain special characters, spaces, or periods.",
            valid: (name) => validator.isAlphanumeric(name),
          },
        ],
      },
      {
        key: 'purpose',
        label: 'Purpose: (optional)',
        hint: "what's this channel about?",
        value: channel.purpose,
        props: {maxLength: 250},
        errorMessage: '',
        validations: [
          {
            message: "channel names must be less than 250 characters long.",
            valid: (name) => validator.isLength(name, {max: 250}),
          },
        ],
      },
    ];

    //merge errors
    if (errors.length > 0) {
      inputList.forEach((item) => {
        const errorMessages = errors
          .filter((error) => error.key === item.key)
          .map((error) => error.message);
        if (errorMessages.length > 0) {
          item.errorText = errorMessages.join();
        } else {
          item.errorText = '';
        }
      });
    }

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
                  item.validations,
                  item.props
                ))
              )}
            </ul>
            <div className="bottom_area">
              <FlatButton
                style={submitButtonStyle}
                label={'Create Channel'}
                labelPosition="after"
                primary={true}
                onClick={this.handleSubmit}
                disabled={disabledSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateChannel.propTypes = propTypes;
CreateChannel.contextTypes = contextTypes;

export default connect(null, channelActions)(CreateChannel);
