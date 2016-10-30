import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { retrieve as retrieveMessages } from 'redux/modules/message';

export class RoomChat extends Component {
  componentDidMount() {
    const chatId = this.props.chat._id;
    this.props.retrieveMessages(chatId);
  }

  render() {
    const styles = require('./RoomChat.scss');
    const { chat, messages } = this.props;

    let messagesList = [];
    if (messages) {
      messagesList = messages.map((message, i) => (
        <div className="message" key={i}>
          {message.content}
        </div>
      ));
    }

    return (
      <div className={styles.roomChatPage}>
        <div className={styles.chatHeader}>
          <h3>/{chat.title}</h3>
          {chat.description}
        </div>

        <div className={styles.chatHistory}>
          <div className="message">
            {messagesList}
          </div>
        </div>

        <div className={styles.chatBox}>
          <input type="text" placeholder="Type a message" />
        </div>
      </div>
    );
  }
}

RoomChat.PropTypes = {
  chat: PropTypes.element,

  retrieveMessages: PropTypes.func.isRequired,
  isRetrievingMessages: PropTypes.bool,
  retrieveMessagesError: PropTypes.any,
  messages: PropTypes.element,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,

    isRetrievingMessages: state.message.isRetrieving,
    retrieveMessagesError: state.message.retrieveError,
    messages: state.message.retrieveResult,
  }
};

export default connect(mapStateToProps, { retrieveMessages })(RoomChat);