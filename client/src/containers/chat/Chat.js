import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
// import { ChatSidebar } from '../sidebars';
import { messageActions } from '../../redux/messages';

import './Chat.css';

const propTypes = {
  messages: PropTypes.object,
  params: PropTypes.shape({
    channelKey: PropTypes.string,
  }),
  loadMessages: PropTypes.func,
  unloadMessages: PropTypes.func,
};

class Chat extends Component {
  state = {
    height: document.documentElement.clientHeight,
    message: '',
  }

  componentDidMount() {
    const { params, loadMessages } = this.props;

    loadMessages(params.channelKey);
  }

  componentWillUnmount() {
    const { unloadMessages } = this.props;
    unloadMessages();
  }

  // handleResize = this.handleResize.bind(this);
  // handleResize() {
  //   this.setState({
  //     height: document.querySelector('.application_content').clientHeight,
  //   });
  // }

  handleUpdateMessage = this.handleUpdateMessage.bind(this);
  handleUpdateMessage(e) {
    this.setState({message: e.target.value});
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleSubmit(e) {
    e.preventDefault();

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
                <input onChange={this.handleUpdateMessage} value={message}/><button>Send</button>
              </form>
            </div>
          </div>
        </div>
        <div className="search_sidebar">
        </div>
      </section>

    );
  }
}

function mapStateToProps(state) {
  const { messages } = state;

  return { messages: messages.list };
}

const mapDispatchToProps = Object.assign(
  {},
  messageActions
);

Chat.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
