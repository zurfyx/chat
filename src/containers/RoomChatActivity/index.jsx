import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './RoomChatActivity.scss';

export class RoomChatActivity extends Component {
  render() {
    return (
      <div className={styles.activityPage}>
        <h4>Activity</h4>
        <div className={styles.entry}>
          <div className={styles.icon}><i className="fa fa-comment" aria-hidden="true"></i></div>
          <div className={styles.entryMain}>
            <header>
              <span className={styles.user}>octocat</span>
              <span className={styles.timestamp}>2016-12-19T13:19:42.075Z</span>
            </header>
            <span>pushed</span>
            <a className={styles.sha} title="9b1b9116043264b8be733f4b2c547be53262fb6a">9b1b9116043264b8be733f4b2c547be53262fb6a</a>
          </div>
        </div>
        <div className={styles.entry}>
          <div className={styles.icon}><i className="fa fa-comment" aria-hidden="true"></i></div>
          <div className={styles.entryMain}>
            <header>
              <span className={styles.user}>octocat</span>
              <span className={styles.timestamp}>2016-12-19T13:19:42.075Z</span>
            </header>
            <span>pushed</span>
            <a className={styles.sha} title="9b1b9116043264b8be733f4b2c547be53262fb6a">9b1b9116043264b8be733f4b2c547be53262fb6a</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,
  }
};

export default connect(mapStateToProps)(RoomChatActivity);