import React, { Component } from 'react';
import io from 'socket.io-client';

import './root.css';

const socket = io('http://localhost:3001');

function appendMessage(user, message, messages) {
  messages.push({
    user,
    message,
  });
  return messages;
}

class Root extends Component {
  state = {
    height: document.documentElement.clientHeight,
    users: [],
    messages: [
      {
        user: 'APPLICATION BOT',
        message: 'Good night world!'
      }
    ],
    name: '',
    message: '',
  }

	componentDidMount() {
    window.addEventListener('resize', this.handleResize);
		socket.on('init', this._initialize);
		socket.on('send:message', this._messageRecieve);
		socket.on('user:join', this._userJoined);
		// socket.on('user:left', this._userLeft);
		// socket.on('change:name', this._userChangedName);
	}

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    const { size } = nextProps;

    if(size) {
      this.setState({
        width: size.width,
      });
    }
  }

  handleResize = this.handleResize.bind(this);
  handleResize() {
    this.setState({
      height: document.documentElement.clientHeight,
    });
  }

  _initialize = this._initialize.bind(this)
	_initialize(data) {
		const { users, name } = data;
		this.setState({ users, name });
	}

  _messageRecieve = this._messageRecieve.bind(this)
	_messageRecieve(message) {
		const { messages } = this.state;
		this.setState(appendMessage(message.user, message.message, messages));
	}

  _userJoined = this._userJoined.bind(this)
	_userJoined(user) {
		const {users, messages} = this.state;
		users.push(user);
	  messages.push({
			user: 'APPLICATION BOT',
			message : user.name +' Joined'
		});
		this.setState({users, messages});
	}

	// _userLeft(data) {
	// 	var {users, messages} = this.state;
	// 	var {name} = data;
	// 	var index = users.indexOf(name);
	// 	users.splice(index, 1);
	// 	messages.push({
	// 		user: 'APPLICATION BOT',
	// 		message : name +' Left'
	// 	});
	// 	this.setState({users, messages});
	// },
  //
	// _userChangedName(data) {
	// 	var {oldName, newName} = data;
	// 	var {users, messages} = this.state;
	// 	var index = users.indexOf(oldName);
	// 	users.splice(index, 1, newName);
	// 	messages.push({
	// 		user: 'APPLICATION BOT',
	// 		message : 'Change Name : ' + oldName + ' ==> '+ newName
	// 	});
	// 	this.setState({users, messages});
	// },
  //
	// handleChangeName(newName) {
	// 	var oldName = this.state.user;
	// 	socket.emit('change:name', { name : newName}, (result) => {
	// 		if(!result) {
	// 			return alert('There was an error changing your name');
	// 		}
	// 		var {users} = this.state;
	// 		var index = users.indexOf(oldName);
	// 		users.splice(index, 1, newName);
	// 		this.setState({users, user: newName});
	// 	});
	// },
  handleUpdateMessage = this.handleUpdateMessage.bind(this);
  handleUpdateMessage(e) {
    this.setState({message: e.target.value});
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleSubmit(e) {
    e.preventDefault();
    const { messages, message, name } = this.state;

    const newMessages = appendMessage(name, message, messages);
		socket.emit('send:message', message);

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

export default Root;
