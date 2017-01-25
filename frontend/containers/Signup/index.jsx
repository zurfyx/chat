import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import FontAwesome from 'react-fontawesome';

import { load, signin, signup, enableAuthModal } from 'redux/modules/auth';
import SignupForm from 'components/SignupForm';

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleSignup = this.handleSignup.bind(this);
    this.changeAuth = this.changeAuth.bind(this);
  }

  handleSignup(data) {
    return this.props.signup(data.email, data.password, data.name)
      .then(() => {
        if (this.props.signUpError) {
          throw new SubmissionError({ _error: `Sign up failed! ${this.props.signUpError.message}` });
        }

        // Sign in the user.
        return this.props.signin(data.email, data.password);
      })
      .then(() => this.props.load())
      .then(() => {
        // Close modal.
        this.props.enableAuthModal();
      });
  }

  changeAuth() {
    this.props.enableAuthModal('signin');
  }

  render() {
    return (
      <div className="form-container">
        <header className="with-subtitle">
          <h2>Sign up</h2>
          Have an account? <a onClick={this.changeAuth}>Sign in</a>
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

        <SignupForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  isSigningUp: PropTypes.bool,
  signUpError: PropTypes.object,

  enableAuthModal: PropTypes.func.isRequired,

  user: PropTypes.object,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isSigningUp: state.auth.isSigningUp,
    signUpError: state.auth.signUpError,
    user: state.auth.user,
  }
};

export default connect(mapStateToProps, { load, signin, signup, enableAuthModal })(Signup);