import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Logout = () => (
      <a onClick={() => this.props.logout()}>
        {this.loggingOut ? '...' : 'Sign out'}
      </a>
    );

    return (
      <header>
        NYAO.IO
        <nav>
          {this.props.user
            ? <div>
                <span>Yo {this.props.user.username}</span>
                <Logout />
              </div>
            : <div>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>}
        </nav>
      </header>
    );
  }
}

NavBar.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  loadError: PropTypes.object,

  loggingIn: PropTypes.bool,
  logInError: PropTypes.object,

  loggingOut: PropTypes.bool,
  logOutError: PropTypes.object,

  user: PropTypes.object
};