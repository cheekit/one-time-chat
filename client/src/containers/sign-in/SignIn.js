import React, { PropTypes, Component } from 'react';
// import { Redirect } from 'react-router';
import { connect } from 'react-redux';
// import { createSelector } from 'reselect';
import { authActions } from '../../redux/auth';

const propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
};

// const contextTypes = {
//   router: PropTypes.object.isRequired,
// };

// function authCheck(state){
//   if(isAuthenticated(state)) {
//     return (
//       <Redirect to={'/'} />
//     );
//   }
//   return null;
// }

class SignIn extends Component {
  // state = {
  //   auth: {}
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   const { router } = this.context;
  //   const { auth } = this.props;
  //
  //   console.log(auth);
  //   console.log(nextProps);
  //
  //   if (!auth.authenticated && nextProps.auth.authenticated) {
  //     router.replaceWith('/');
  //   }
  // }

  render() {
    const {signInWithGithub} = this.props;

    return (
      <div className="g-row sign-in">
        <div className="g-col">
          <h1 className="sign-in__heading">Sign in</h1>
          <button className="btn sign-in__button" onClick={signInWithGithub} type="button">GitHub</button>
        </div>
      </div>
    );
  }
}


// const mapStateToProps = createSelector(
//   getAuth,
//   auth => ({auth}),
// );
//
// function mapStateToProps(state) {
//   console.log(state);
//   const { auth } = state.auth;
//
//   return { auth };
// }


SignIn.propTypes = propTypes;
// SignIn.contextTypes = contextTypes;

export default connect(null, authActions)(SignIn);
