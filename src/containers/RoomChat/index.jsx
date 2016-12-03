import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RoomChatHistory from 'containers/RoomChatHistory';
import RoomChatMessage from 'containers/RoomChatMessage';

export class RoomChat extends Component {
  render() {
    const styles = require('./RoomChat.scss');
    const { chat } = this.props;

    return (
      <div className={styles.roomChatPage}>
        <div className={styles.chatHeader}>
          <h3>/{chat.title}</h3>
          {chat.description}
        </div>

        <RoomChatHistory />
        <RoomChatMessage />
      </div>
    );
  }
}

RoomChat.PropTypes = {
  chat: PropTypes.element,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,
  }
};

export default connect(mapStateToProps)(RoomChat);