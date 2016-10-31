import React, { PropTypes, Component } from 'react';
import { Match } from 'react-router';
import { Root, Sample, ChatToolbar } from './containers';
import './App.css';

const propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  signOut: PropTypes.func.isRequired,
};

const contextTypes = {
  router: PropTypes.object.isRequired,
};

class App extends Component {
  render() {
    const routes = [
      {
        pattern: '/',
        content: () => <Root />,
        toolbar: () => <ChatToolbar />,
        exactly: true,
      },
      {
        pattern: '/sample',
        content: () => <Sample />,
        toolbar: () => null,
        exactly: false,
      },
    ];

    return (
      <div className="application_wrapper">
        <noscript></noscript>
        <div className="application_header">
          {routes.map((route, index) => (
            <Match
              key={index}
              pattern={route.pattern}
              component={route.toolbar}
              exactly={route.exactly}
            />
          ))}
        </div>
        <div className="application_content">
          <button onClick={this.props.signOut}>Sign out</button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;

export default App;
