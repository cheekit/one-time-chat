import React, { PropTypes } from 'react';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';
import { Root, Sample, SignIn, ChatToolbar } from './containers';
import { getAuth, authActions } from './redux/auth';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { NotFound } from './components';
import './App.css';

const propTypes = {
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

function App(props){
  const { auth, signOut, signInWithGithub } = props;

  const isAuth = auth.authenticated;

  const routes = [
    {
      pattern: '/',
      content: () => <Root />,
      toolbar: () => <ChatToolbar />,
      exactly: true,
      isAuth,
    },
    {
      pattern: '/sign-in',
      content: () => <SignIn isAuth={isAuth} signInWithGithub={signInWithGithub}></SignIn>,
      toolbar: () => <ChatToolbar />,
      isPublic: true,
    },
    {
      pattern: '/sample',
      content: () => <Sample />,
      toolbar: () => null,
      isPublic: true,
    },
  ];

  return (
    <BrowserRouter>
      {({ router }) => (
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
            <button onClick={signOut}>Sign out</button>
            <Miss component={NotFound} />
            {routes.map((route, index) => (
              <MatchWhenAuthorized
                key={index}
                pattern={route.pattern}
                exactly={route.exactly}
                component={route.content}
                isPublic={route.isPublic}
                isAuth={route.isAuth}
              />
            ))}
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

const MatchWhenAuthorized = ({ component: Component, isPublic, isAuth, ...rest }) => (
  <Match {...rest} render={props => (
     isPublic || isAuth ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/sign-in',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth}),
);

App.propTypes = propTypes;

export default connect(
  mapStateToProps,
  authActions
)(App);
