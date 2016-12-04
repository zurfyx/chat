import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class MessageMore extends Component {
  constructor(props) {
    super(props);

    this.handlePicture = this.handlePicture.bind(this);
    this.handleCode = this.handleCode.bind(this);
  }

  handlePicture() {
    alert('Coming soon...');
  }

  handleCode() {

  }

  render() {
    const styles = require('./MessageMore.scss');

    return (
      <div className={styles.messageMore}>
        <div className={`vertical-fold ${styles.foldContainer}`}>
          <ul>
            <li>
              <a className="no-decorate" onClick={this.handlePicture}>
                <i className="fa fa-picture-o" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a className="no-decorate" onClick={this.handleCode}>
                <i className="fa fa-code" aria-hidden="true"></i>
              </a>
            </li>
          </ul>

          <a href="#" className={styles.moreButton}>
            <i className="fa fa-plus"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default connect()(MessageMore);