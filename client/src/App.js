import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router';
import { createSelector } from 'reselect';
import { Root, Sample, ChatToolbar } from './containers';
import { authActions, getAuth } from './redux/auth';
import './App.css';

const propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  signOut: PropTypes.func.isRequired,
  public: PropTypes.bool,
}

const contextTypes = {
  router: PropTypes.object.isRequired,
}

class App extends Component {

  componentWillReceiveProps(nextProps) {
    const { router } = this.context;
    const { auth } = this.props;

    if (auth.authenticated && !nextProps.auth.authenticated) {
      router.replaceWith('/sign-in');
    }
    else if (!auth.authenticated && nextProps.auth.authenticated) {
      router.replaceWith('/');
    }
  }

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

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth}),
);

App.propTypes = propTypes;
App.contextTypes = contextTypes;

export default connect(
  mapStateToProps,
  authActions
)(App);
