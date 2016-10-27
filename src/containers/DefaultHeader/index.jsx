import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import Signin from 'containers/Signin';
import Signup from 'containers/Signup';
import Signout from 'containers/Signout';

export class DefaultHeader extends Component {
  render() {
    const styles = require('./DefaultHeader.scss');
    const { styleType, user } = this.props;

    const generateNavList = (arr) => arr.map((ele, i) => <li key={i}>{ele}</li>);
    const guestNav = generateNavList([
      <a href="#" className="underline">Rooms</a>,
      <a href="#" className="underline">Sign in</a>,
      <a href="#" className="underline">Sign up</a>,
      <a href="#"><FontAwesome name="bars" /></a>,
    ]);
    const userNav = generateNavList([
      <a href="#" className="underline">Rooms</a>,
      <a href="#" className="underline">{user && user.profile.name}</a>,
      <Signout />,
      <a href="#"><FontAwesome name="bars" /></a>,
    ]);

    return (
      <header className={`${styles.headerPage} ${styles[styleType]}`}>
        <nav>
          {this.props.user
            ? <ul className="horizontal-list">
                {userNav}
              </ul>
            : <ul className="horizontal-list">
                {guestNav}
              </ul>}
        </nav>
        <span className={styles.logo}>NYAO.IO</span>
        {/*<Signin />*/}
        {/*<Signup />*/}
      </header>
    );
  }
}

DefaultHeader.propTypes = {
  styleType: PropTypes.string, // Accepting 'transparent'.

  user: PropTypes.object
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(DefaultHeader);