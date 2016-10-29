import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { signout } from 'redux/modules/auth';

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleSignout = this.handleSignout.bind(this);
  }

  handleSignout() {
    if (this.props.isSigningOut) return;

    this.props.signout()
      .then(() => {
        if (this.props.signOutError) {
          alert('Failed to sign out.');
        }
      });
  }

  render() {
    return (
      <a className="underline" onClick={this.handleSignout}>
        {this.isSigningOut ? '...' : 'Sign out' }
      </a>
    );
  }
}

Signup.propTypes = {
  signout: PropTypes.func.isRequired,
  isSigningOut: PropTypes.bool,
  signOutError: PropTypes.object,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isSigningOut: state.auth.isSigningOut,
    signOutError: state.auth.signOutError,
  }
};

export default connect(mapStateToProps, { signout })(Signup);