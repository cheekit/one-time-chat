import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { ChatSidebar } from '../sidebars';
import { messageActions, Message } from '../../redux/messages';
import { channelActions } from '../../redux/channels';
import { joinChannel, leftChannel } from '../../redux/services';
import { loadRoomMembers, unloadRoomMembers } from '../../redux/users/actions';

import './Chat.css';

const propTypes = {
  messages: PropTypes.object,
  joinChannel: PropTypes.func,
  leftChannel: PropTypes.func,
  loadMessages: PropTypes.func,
  unloadMessages: PropTypes.func,
  createMessage: PropTypes.func,
  loadChannel: PropTypes.func,
  deleteChannel: PropTypes.func,
  loadRoomMembers: PropTypes.func,
  unloadRoomMembers: PropTypes.func,
  auth: PropTypes.object,
  params: PropTypes.shape({
    channelKey: PropTypes.string,
  }),
  router: PropTypes.object,
};

class Chat extends Component {
  state = {
    height: document.documentElement.clientHeight,
    message: new Message(),
  }

  componentDidMount() {
    const { auth, loadMessages, joinChannel, loadRoomMembers, router } = this.props;
    const { channelKey } = this.props.params;

    Promise.all([
      loadMessages(channelKey),
      joinChannel({ channelKey, name: auth.name, id: auth.id, router }),
      loadRoomMembers(channelKey)
    ]);
  }

  componentWillUnmount() {
    const { unloadMessages, unloadRoomMembers } = this.props;
    unloadMessages();
    unloadRoomMembers();
  }

  handleDeleteChannel(props) {
    const { deleteChannel, params, router } = props;
    deleteChannel({key: params.channelKey})
    router.replaceWith('/');
  }

  handleLeftChannel(props) {
    const { auth, params, leftChannel, router } = props;

    leftChannel({channelKey: params.channelKey, name: auth.name, id: auth.id});
    router.replaceWith('/');
  }

  handleUpdateMessage = this.handleUpdateMessage.bind(this);
  handleUpdateMessage(e) {
    const { message } = this.state;
    const body = message.body; //TODO it must check stringPostBody or StampBody;
    const newBody = body.set('content', e.target.value);
    const newMessage = message.set('body', newBody);

    this.setState({
      message: newMessage,
    });
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleSubmit(e) {
    e.preventDefault();
    const { createMessage } = this.props;
    const { message } = this.state;

    createMessage(message);

    this.setState({
      message: new Message(),
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
        {message.body.content}
      </li>
    );
  }

  render() {
    const { messages } = this.props;
    const { message, height } = this.state;
    const formHeight = 40+64;
    const messagesStyle = {
      height: height - formHeight,
    };

    return (
      <section className="search">
        <div className="search_content">
          <div className="search_inner_content">
            <div style={{height: height}}>
              <ul className={"messages"} style={messagesStyle}>
                {messages.map((m, i) => this.renderMessage('', m, i))}
              </ul>
              <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleUpdateMessage} value={message.body.content}/><button>Send</button>
              </form>
            </div>
          </div>
        </div>
        <div className="search_sidebar">
          <button onClick={() => this.handleLeftChannel(this.props)}> Left room </button>
          <button onClick={() => this.handleDeleteChannel(this.props)}> Delete room </button>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  const { messages, auth, roomMembers } = state;

  console.log(roomMembers.list);
  return { messages: messages.list , auth: auth };
}

function mapDispatchToProps(dispatch) {
  return {
    loadMessages: (props) => dispatch(messageActions.loadMessages(props)),
    unloadMessages: () => dispatch(messageActions.unloadMessages()),
    createMessage: (props) => dispatch(messageActions.createMessage(props)),
    joinChannel: (props) => dispatch(joinChannel(props)),
    leftChannel: (props) => dispatch(leftChannel(props)),
    deleteChannel: (props) => dispatch(channelActions.deleteChannel(props)),
    loadRoomMembers: (props) => dispatch(loadRoomMembers(props)),
    unloadRoomMembers: (props) => dispatch(unloadRoomMembers()),
  };
}

Chat.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
