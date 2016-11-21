import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  retrieve as retrieveMessages,
  send as sendMessage,
} from 'redux/modules/message';

export class RoomChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formContent: '',
    };

    this.handleFormContentChange = this.handleFormContentChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }
  componentDidMount() {
    const chatId = this.props.chat._id;
    this.props.retrieveMessages(chatId);
  }

  handleFormContentChange(e) {
    this.setState({ formContent: e.target.value });
  }

  handleSendMessage(e) {
    e.preventDefault();

    this.setState({ formContent: '' });
    this.props.sendMessage(this.props.chat._id, this.state.formContent);
  }

  render() {
    const styles = require('./RoomChat.scss');
    const { chat, messages } = this.props;

    const chatMessages = messages.filter((message) => {
      return message.chat === chat._id;
    });
    const renderedMessages = chatMessages.map((message, i) => (
      <div className="message" key={i}>
        {message.content}
      </div>
    ));

    return (
      <div className={styles.roomChatPage}>
        <div className={styles.chatHeader}>
          <h3>/{chat.title}</h3>
          {chat.description}
        </div>

        <div className={styles.chatHistory}>
          <div className="message">
            {renderedMessages}
          </div>
        </div>

        <div className={styles.chatBox}>
          <form onSubmit={this.handleSendMessage}> {/* TODO */}
            <input
              type="text"
              placeholder="Type a message"
              required
              value={this.state.formContent}
              onChange={this.handleFormContentChange}
            />
          </form>
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
  messages: PropTypes.Array,
};

RoomChat.defaultProps = {
  messages: [],
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,

    isRetrievingMessages: state.message.isRetrieving,
    retrieveMessagesError: state.message.retrieveError,
    messages: state.message.retrieveResult,
  }
};

export default connect(mapStateToProps, { retrieveMessages, sendMessage })(RoomChat);