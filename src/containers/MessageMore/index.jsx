import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class MessageMore extends Component {
  render() {
    const styles = require('./MessageMore.scss');

    return (
      <div className={styles.messageMore}>
        <a href="#" className={styles.moreButton}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </a>
      </div>
    );
  }
}

export default connect()(MessageMore);