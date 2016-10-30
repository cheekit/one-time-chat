import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { initSocket, sendMessage } from '../../redux/actions';

import './root.css';

const propTypes = {
  dispatch: PropTypes.func,
  sockets: PropTypes.object,
};

class Root extends Component {
  state = {
    height: document.documentElement.clientHeight,
    sockets: {
      messages: [],
    },
    message: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(initSocket());

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
      height: document.documentElement.clientHeight,
    });
  }

  handleUpdateMessage = this.handleUpdateMessage.bind(this);
  handleUpdateMessage(e) {
    this.setState({message: e.target.value});
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { message, sockets } = this.state;
    const { name } = sockets;

    dispatch(sendMessage(name, message))

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
    const { sockets, message, height } = this.state;
    const { messages } = sockets;
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
