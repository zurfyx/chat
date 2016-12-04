import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import marked from 'marked';

import { retrieve as retrieveMessages } from 'redux/modules/message';

// Text messages Markdown config
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

export class RoomChatHistory extends Component {
  constructor(props) {
    super(props);

    this.shouldScrollBottom = true;

    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    const chatId = this.props.chat._id;
    this.props.retrieveMessages(chatId);
  }

  componentWillUpdate() {
    const node = findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (!this.shouldScrollBottom) return;

    const node = findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    const styles = require('./RoomChatHistory.scss');
    const { chat, messages } = this.props;

    const chatMessages = messages.filter((message) => {
      return message.chat === chat._id;
    });
    const renderedMessages = chatMessages.map((message, i) => (
      <div className={styles.message} key={i}>
        <div className={styles.messageSenderImage}>
        </div>
        <div className={styles.messageInformation}>
          <div className={styles.messageHeader}>
            <span className={styles.messageSenderName}>{message.owner}</span>
            <span className={styles.messageTimestamp}>
              {message.createdAt}
              {message.createdAt != message.updatedAt && <span className={styles.messageEdited}>(edited)</span>}
            </span>
          </div>
          <div className={styles.messageContent} dangerouslySetInnerHTML={{__html: marked(message.content)}}>
          </div>
        </div>
      </div>
    ));

    return (
      <div className={styles.messages}>
        <div className={styles.loadMore}>
          Load more
        </div>
        {renderedMessages}
      </div>
    );
  }
}

RoomChatHistory.PropTypes = {
  chat: PropTypes.element,

  retrieveMessages: PropTypes.func.isRequired,
  isRetrievingMessages: PropTypes.bool,
  retrieveMessagesError: PropTypes.any,
  messages: PropTypes.Array,
};

RoomChatHistory.defaultProps = {
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

export default connect(mapStateToProps, { retrieveMessages })(RoomChatHistory);