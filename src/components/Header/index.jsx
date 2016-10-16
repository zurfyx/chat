import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Signin from 'containers/Signin';
import Signup from 'containers/Signup';

// const Signout = () => (
//   <a onClick={() => this.props.signout()}>
//     {this.signingOut ? '...' : 'Sign out'}
//   </a>
// );

export default class NavBar extends Component {
  render() {
    return (
      <header>
        Logo
        <nav>
          {this.props.user
            ? <div>
                <span>Yo {this.props.user.profile.name}</span>
              </div>
            : <div>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>}
        </nav>
        <Signin />
        <Signup />
      </header>
    );
  }
}

NavBar.propTypes = {
  user: PropTypes.object
};