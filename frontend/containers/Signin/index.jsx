import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import { load, signin, enableAuthModal } from 'redux/modules/auth';
import SigninForm from 'components/SigninForm';

export class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleSignin = this.handleSignin.bind(this);
    this.changeAuth = this.changeAuth.bind(this);
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
        // Close modal.
        this.props.enableAuthModal();
      });
  }

  changeAuth() {
    this.props.enableAuthModal('signup');
  }

  render() {
    return (
      <div className="form-container">
        <header className="with-subtitle">
          <h2>Sign in</h2>
          Don't have an account? <a onClick={this.changeAuth}>Sign up</a>
        </header>

        <div className="field-container">
          <form action="/api/auth/github">
            <button type="submit"><FontAwesome name="github" /> Sign in with GitHub</button>
          </form>
        </div>
        <div className="field-container">
          <form action="/api/auth/google">
            <button type="submit"><FontAwesome name="google" /> Sign in with Google</button>
          </form>
        </div>
        <div className="spacer">
          <span>or</span>
        </div>

        <SigninForm onSubmit={this.handleSignin} />
      </div>
    );
  }
}

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  isSigningIn: PropTypes.bool,
  signInError: PropTypes.object,

  enableAuthModal: PropTypes.func.isRequired,

  user: PropTypes.object,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isSigningIn: state.auth.isSigningIn,
    signInError: state.auth.signInError,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { load, signin, enableAuthModal })(Signin);