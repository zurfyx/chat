import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Signin from 'containers/Signin';
import Signup from 'containers/Signup';
import Signout from 'containers/Signout';

export class DefaultHeader extends Component {
  render() {
    const styles = require('./Header.scss');
    return (
      <header className={styles.headerPage}>
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
        {/*<Signin />*/}
        {/*<Signup />*/}
      </header>
    );
  }
}

DefaultHeader.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(DefaultHeader);