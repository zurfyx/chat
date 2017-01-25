import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import { enableAuthModal } from 'redux/modules/auth';
import Signout from 'containers/Signout';

export class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.handleSignin = this.handleSignin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignin() {
    this.props.enableAuthModal('signin');
  }
  handleSignup() {
    this.props.enableAuthModal('signup');
  }
  render() {
    const styles = require('./DefaultHeader.scss');
    const { styleType, user } = this.props;

    const generateNavList = (arr) => arr.map((ele, i) => <li key={i}>{ele}</li>);
    const guestNav = generateNavList([
      <Link to="/rooms" className="underline">Rooms</Link>,
      <a className="underline" onClick={this.handleSignin}>Sign in</a>,
      <a className="underline" onClick={this.handleSignup}>Sign up</a>,
      <a href="#"><FontAwesome name="bars" /></a>,
    ]);
    const userNav = generateNavList([
      <Link to="/rooms" className="underline">Rooms</Link>,
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
        <Link to="/" className={styles.logo}>NYAO.IO</Link>
      </header>
    );
  }
}

DefaultHeader.propTypes = {
  styleType: PropTypes.string, // Accepting 'transparent'.

  user: PropTypes.object,

  enableAuthModal: PropTypes.func.isRequired,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { enableAuthModal })(DefaultHeader);