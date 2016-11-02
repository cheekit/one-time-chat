import React, { PropTypes } from 'react';
import { Redirect } from 'react-router';
import { FlatButton } from 'material-ui';

import './SignIn.css';

const propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  isAuth:  PropTypes.bool.isRequired,
};

function SignIn(props) {
  const {signInWithGithub, isAuth} = props;

  const buttonStyle = {
    marginBottom: '10px',
    border: '1px solid #fff',
    width: '100%',
    height: '48px',
    fontSize: '1.125rem',
    lineHeight: '48px',
    color: '#fff',
  };

  return (
    <div className="g-row sign-in">
      {isAuth && (
        <Redirect to={'/'}/>
      )}
      <div className="g-col">
        <h1 className="sign-in__heading">Sign in</h1>
        <FlatButton style={buttonStyle} onTouchTap={signInWithGithub} label="GitHub"></FlatButton>
      </div>
    </div>
  );
}

SignIn.propTypes = propTypes;

export default SignIn;
