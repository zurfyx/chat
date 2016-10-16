import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { load, signin, signup } from 'redux/modules/auth';
import SignupForm from 'components/SignupForm';

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignup(data) {
    console.info(data);
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
        // Redirect to Home page.
        console.info('Successfully signed up! Redirect to Home page...');
      });
  }

  render() {
    return (
      <div>
        <h2>Sign up</h2>
        <SignupForm onSubmit={this.handleSignup} />
        <a href="/api/auth/github">Sign in with GitHub</a>
        <a href="/api/auth/google">Sign in with Google</a>
      </div>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  isSigningUp: PropTypes.bool,
  signUpError: PropTypes.object,

  user: PropTypes.object,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isSigningUp: state.auth.isSigningUp,
    signUpError: state.auth.signUpError,
    user: state.auth.user,
  }
};

export default connect(mapStateToProps, { load, signin, signup })(Signup);