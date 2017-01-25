import React, { Component, PropTypes } from 'react';

import MessageMore from 'containers/MessageMore';
import MessageForm from 'containers/MessageForm';

export default class RoomChatMessage extends Component {
  render() {
    const styles = require('./RoomChatMessage.scss');

    return (
      <div className={styles.chatBox}>
        <MessageMore />
        <MessageForm />
      </div>
    );
  }
}