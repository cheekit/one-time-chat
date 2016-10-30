import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
  dispatch: PropTypes.func,
  sockets: PropTypes.object,
}

class ChatSidebar extends Component {
  state = {
    sockets: {
      users: [],
    },
  }

  componentWillReceiveProps(nextProps) {
    const { sockets } = nextProps;

    if (sockets) this.setState({ sockets });
  }

  renderUser(user, key) {
    return (
      <li key={key}><p>{user}</p></li>
    );
  }

  render() {
    const { users } = this.state.sockets;

    return (
      <div>
        <ul>
          {users.map((user, i) => this.renderUser(user, i))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { sockets } = state.socketsReducer;

  return { sockets };
}

ChatSidebar.propTypes = propTypes;

export default connect(mapStateToProps)(ChatSidebar);
