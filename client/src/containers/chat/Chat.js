import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { initSocket, sendMessage } from '../../redux/chat';
import { ChatSidebar } from '../sidebars';

import './Chat.css';

const propTypes = {
  dispatch: PropTypes.func,
  sockets: PropTypes.object,
};

class Chat extends Component {
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
      height: document.querySelector('.application_content').clientHeight,
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
                {messages.map((m, i) => this.renderMessage(m.user, m.message, i))}
              </ul>
              <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleUpdateMessage} value={message}/><button>Send</button>
              </form>
            </div>
          </div>
        </div>
        <div className="search_sidebar">
          <ChatSidebar />
        </div>
      </section>

    );
  }
}

function mapStateToProps(state) {
  const { sockets } = state.socketsReducer;

  return { sockets };
}

Chat.propTypes = propTypes;

export default connect(mapStateToProps)(Chat);
