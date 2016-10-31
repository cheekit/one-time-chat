import React, { PropTypes } from 'react';
import { Redirect } from 'react-router';

const propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  isAuth:  PropTypes.bool.isRequired,
};

function SignIn(props) {
  const {signInWithGithub, isAuth} = props;

  return (
    <div className="g-row sign-in">
      {isAuth && (
        <Redirect to={'/'}/>
      )}
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>
        <button className="btn sign-in__button" onClick={signInWithGithub} type="button">GitHub</button>
      </div>
    </div>
  );
}

SignIn.propTypes = propTypes;

export default SignIn;
