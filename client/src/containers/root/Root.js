import React, { PropTypes, Component } from 'react';
import SizeMe from 'react-sizeme';
import io from 'socket.io-client';

import './root.css';

const socket = io('http://localhost:3001');

const propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
  }),
};

class Root extends Component {
  state = {
    users: [],
    messages: [],
    name: ''
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

	componentDidMount() {
		socket.on('init', this._initialize);
		// socket.on('send:message', this._messageRecieve);
		// socket.on('user:join', this._userJoined);
		// socket.on('user:left', this._userLeft);
		// socket.on('change:name', this._userChangedName);
	}

  _initialize = this._initialize.bind(this)
	_initialize(data) {
		const { users, name } = data;
    console.log(data);
		this.setState({ users, name });
	}

	// _messageRecieve(message) {
	// 	var {messages} = this.state;
	// 	messages.push(message);
	// 	this.setState({messages});
	// },
  //
	// _userJoined(data) {
	// 	var {users, messages} = this.state;
	// 	var {name} = data;
	// 	users.push(name);
	// 	messages.push({
	// 		user: 'APPLICATION BOT',
	// 		text : name +' Joined'
	// 	});
	// 	this.setState({users, messages});
	// },
  //
	// _userLeft(data) {
	// 	var {users, messages} = this.state;
	// 	var {name} = data;
	// 	var index = users.indexOf(name);
	// 	users.splice(index, 1);
	// 	messages.push({
	// 		user: 'APPLICATION BOT',
	// 		text : name +' Left'
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
	// 		text : 'Change Name : ' + oldName + ' ==> '+ newName
	// 	});
	// 	this.setState({users, messages});
	// },
  //
	// handleMessageSubmit(message) {
	// 	var {messages} = this.state;
	// 	messages.push(message);
	// 	this.setState({messages});
	// 	socket.emit('send:message', message);
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

	render() {
    // const { users, messages } = this.state;
    console.log(this.state);

		return (
			<div>
			</div>
		);
	}
}

Root.propTypes = propTypes;

export default SizeMe()(Root);
