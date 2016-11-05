import React, { PropTypes } from 'react';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';
import { Root, Sample, SignIn, Toolbar, Chat, CreateChannel } from './containers';
import { getAuth, authActions } from './redux/auth';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { NotFound } from './components';
import './App.css';

const propTypes = {
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  signInWithGithub: PropTypes.func.isRequired,
};

function App(props){
  const { auth, signOut, signInWithGithub } = props;

  const isAuth = auth.authenticated;

  const routes = [
    {
      pattern: '/',
      content: () => <Root />,
      toolbar: () => <Toolbar auth={auth} signOut={signOut}/>,
      exactly: true,
      isAuth,
    },
    {
      pattern: '/sign-in',
      content: () => <SignIn isAuth={isAuth} signInWithGithub={signInWithGithub}></SignIn>,
      toolbar: () => <Toolbar auth={auth} signOut={signOut}/>,
      isPublic: true,
    },
    {
      pattern: '/sample',
      content: () => <Sample />,
      toolbar: () => <Toolbar auth={auth} signOut={signOut}/>,
      isPublic: true,
    },
    {
      pattern: '/chat',
      content: () => <Chat />,
      toolbar: () => <Toolbar auth={auth} signOut={signOut}/>,
      isAuth,
    },
    {
      pattern: '/create-channel',
      content: () => <CreateChannel />,
      toolbar: () => <Toolbar auth={auth} signOut={signOut}/>,
      isAuth,
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
