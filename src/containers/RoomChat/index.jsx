import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class RoomChat extends Component {
  render() {
    const styles = require('./RoomChat.scss');

    return (
      <div className={styles.roomChatPage}>
        <div className={styles.chatHeader}>
          <h3>/my-first-chat</h3>
          Chat description
        </div>

        <div className={styles.chatHistory}>
          <div className="message">
            Hello world!
          </div>
        </div>

        <div className={styles.chatBox}>
          <input type="text" placeholder="Type a message" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {

  }
};

export default connect(mapStateToProps)(RoomChat);