import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { initSocket } from '../../redux/actions';

import './root.css';

const systemName = 'APPLICATION BOT';

const propTypes = {
  dispatch: PropTypes.func,
  sockets: PropTypes.object,
};

function appendMessage(user, message, messages) {
  messages.push({
    user,
    message,
  });
  return messages;
}

function removeUser(leftUser, users) {
  const leftUserName = leftUser.name;
  return users.filter((user) => user.name === leftUserName);
}

class Root extends Component {
  state = {
    height: document.documentElement.clientHeight,
    users: [],
    messages: [
      {
        user: systemName,
        message: 'Good night world!'
      }
    ],
    name: '',
    message: '',
    sockets: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(initSocket());

    window.addEventListener('resize', this.handleResize);
    // socket.on('init', this._initialize);
    // socket.on('send:message', this._messageRecieve);
    // socket.on('user:join', this._userJoined);
    // socket.on('user:left', this._userLeft);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    const { sockets } = nextProps;

    console.log(sockets);
    if (sockets) this.setState({ sockets });
  }

  handleResize = this.handleResize.bind(this);
  handleResize() {
    this.setState({
      height: document.documentElement.clientHeight,
    });
  }

  _userJoined = this._userJoined.bind(this);
  _userJoined(user) {
    const { users, messages } = this.state;
    users.push(user);
    const newMessages = appendMessage(systemName, `${user.name} Joined`, messages);
    this.setState({ users, messages: newMessages });
  }

  _userLeft = this._userLeft.bind(this);
  _userLeft(user) {
    const { users, messages } = this.state;
    const newUsers = removeUser(user, users);
    const newMessages = appendMessage(systemName, `${user.name} Left`, messages);
    this.setState({ users: newUsers, messages: newMessages });
  }

  handleUpdateMessage = this.handleUpdateMessage.bind(this);
  handleUpdateMessage(e) {
    this.setState({message: e.target.value});
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleSubmit(e) {
    e.preventDefault();
    const { messages, message, name } = this.state;

    const newMessages = appendMessage(name, message, messages);
    // socket.emit('send:message', message);

    this.setState({
      message: '',
      messages: newMessages,
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
    const { messages, message, height } = this.state;
    const formHeight = 40;
    const messagesStyle = {
      height: height - formHeight,
    };

    return (
      <div style={{height: height}}>
        <ul className={"messages"} style={messagesStyle}>
          {messages.map((m, i) => this.renderMessage(m.user, m.message, i))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleUpdateMessage} value={message}/><button>Send</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { sockets } = state.socketsReducer;

  return { sockets };
}

Root.propTypes = propTypes;

export default connect(mapStateToProps)(Root);
