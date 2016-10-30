import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class RoomSidebar extends Component {
  render() {
    const styles = require('./RoomSidebar.scss');

    return (
      <div className={styles.roomSidebarPage}>
        <div>
          <div className={styles.roomInfo}>
            <a className={styles.roomTitle}>
              <h2>My Room</h2>
            </a>
          </div>
          <div className="chatListContainer">
            <div className="chatListSummary">
              <button className={styles.new}>+</button>
              Chats (2)
            </div>
            <ul className={styles.chatList}>
              <li>/my-first-chat</li>
              <li>/my-second-chat</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {

  }
};

export default connect(mapStateToProps)(RoomSidebar);