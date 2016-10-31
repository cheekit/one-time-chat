import React, { PropTypes } from 'react';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';
import { Root, Sample, SignIn } from './containers';
import { isAuthenticated, getAuth, authActions } from './redux/auth';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { NotFound } from './components';
import App from './App';

const propTypes = {
  store: PropTypes.object,
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

function Routes(props){
  const { store, auth, signOut, signInWithGithub } = props;
  const state = store.getState();

  return (
    <BrowserRouter>
      {({ router }) => (
        <App signOut={signOut} auth={auth}>
          {isAuthenticated(state) ? (
            <p>
              Welcome! {' '}
            </p>
          ) : (
            <p>You are not logged in.</p>
          )}
          <Match pattern="/sample" component={Sample}/>
          <Match pattern="/sign-in" component={() => <SignIn isAuth={isAuthenticated(state)} signInWithGithub={signInWithGithub}></SignIn>}/>
          <MatchWhenAuthorized pattern="/" component={Root} exactly state={state}/>
          <Miss component={NotFound} />
        </App>
      )}
    </BrowserRouter>
  );
}

const MatchWhenAuthorized = ({ component: Component, state, ...rest }) => (
  <Match {...rest} render={props => (
    isAuthenticated(state) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/sign-in',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const mapStateToProps = createSelector(
  getAuth,
  auth => ({auth}),
);

Routes.propTypes = propTypes;

export default connect(
  mapStateToProps,
  authActions
)(Routes);
