import React, { PropTypes } from 'react';
import { BrowserRouter, Match, Miss, Redirect } from 'react-router';
import { Root, Sample, SignIn } from './containers';
import { isAuthenticated } from './redux/auth';
import { NotFound } from './components';
import App from './App';

const propTypes = {
  store: PropTypes.object,
};

function Routes(props){
  const state = props.store.getState();

  return (
    <BrowserRouter>
      {({ router }) => (
        <App>
          {isAuthenticated(state) ? (
            <p>
              Welcome! {' '}
            </p>
          ) : (
            <p>You are not logged in.</p>
          )}
          <Match pattern="/sample" component={Sample}/>
          <Match pattern="/sign-in" component={SignIn}/>
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

Routes.propTypes = propTypes;

export default Routes;
