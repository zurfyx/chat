import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { load, signin } from 'redux/modules/auth';
import SigninForm from 'components/SigninForm';

export class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleSignin = this.handleSignin.bind(this);
  }

  handleSignin(data) {
    return this.props.signin(data.email, data.password)
      .then(() => {
        if (this.props.signInError) {
          throw new SubmissionError({ _error: `Sign in failed! ${this.props.signInError.message}` });
        }

        // Refresh logged in user.
        return this.props.load();
      })
      .then(() => {
        // Redirect to Home page.
        console.info('Successfully signed in! Redirecting to Home page...');
      });
  }

  render() {
    return (
      <div>
        <h2>Sign in</h2>
        <SigninForm onSubmit={this.handleSignin} />
        <a href="/api/auth/github">Sign in with GitHub</a>
        <a href="/api/auth/google">Sign in with Google</a>
      </div>
    );
  }
}

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  isSigningIn: PropTypes.bool,
  signInError: PropTypes.object,

  user: PropTypes.object,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isSigningIn: state.auth.isSigningIn,
    signInError: state.auth.signInError,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { load, signin })(Signin);