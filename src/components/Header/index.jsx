import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Signin from 'containers/Signin';
import Signup from 'containers/Signup';
import Signout from 'containers/Signout';

export default class NavBar extends Component {
  render() {
    return (
      <header>
        Logo
        <nav>
          {this.props.user
            ? <div>
                <span>Yo {this.props.user.profile.name}</span>
                <Signout />
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