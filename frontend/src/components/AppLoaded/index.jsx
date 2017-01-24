import React, { Component, PropTypes } from 'react';

import Signin from 'containers/Signin';
import Signup from 'containers/Signup';

export default class AppLoaded extends Component {
  constructor(props) {
    super(props);

    this.closeAuthModal = this.closeAuthModal.bind(this);
  }

  closeAuthModal(e) {
    if (e.target.className.indexOf('modal') !== -1) {
      this.props.enableAuthModal();
    }
  }

  render() {
    const styles = require('./AppLoaded.scss');
    const { header, main, footer, authModal } = this.props;

    return (
      <div className={styles.appLoadedPage}>
        {authModal && <div className="modal" onClick={this.closeAuthModal}>
          {authModal==='signin'
            ? <Signin />
            : <Signup />}
        </div>}

        {header}
        {main}
        {footer}
      </div>
    );
  }
}

AppLoaded.PropTypes = {
  header: PropTypes.element,
  main: PropTypes.element.isRequired,
  footer: PropTypes.element,

  authModal: PropTypes.string,
};