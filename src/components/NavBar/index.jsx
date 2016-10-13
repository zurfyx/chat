import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { SigninContainer } from 'components/Signin';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Signout = () => (
      <a onClick={() => this.props.signout()}>
        {this.signingOut ? '...' : 'Sign out'}
      </a>
    );

    return (
      <header>
        NYAO.IO
        <nav>
          {this.props.user
            ? <div>
                <span>Yo {this.props.user.username}</span>
                <Signout />
              </div>
            : <div>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>}
        </nav>
        <SigninContainer />
      </header>
    );
  }
}

NavBar.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  loadError: PropTypes.object,

  signingIn: PropTypes.bool,
  signingError: PropTypes.object,

  signingOut: PropTypes.bool,
  signingOutError: PropTypes.object,

  user: PropTypes.object
};