import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';

import { retrieve as retrieveMessages } from 'redux/modules/message';
import { socketEdit } from 'redux/modules/chat';
import ScrollContainer from 'components/ScrollContainer';

// Prism code highlight libraries.
import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

import styles from './RoomChatHistory.scss';

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

    this.stickMessage = this.stickMessage.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.renderSticky = this.renderSticky.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.renderMessageContent = this.renderMessageContent.bind(this);
  }

  componentDidMount() {
    const chatId = this.props.chat._id;
    this.props.retrieveMessages(chatId);
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  stickMessage(message) {
    const sticky = message._id === this.props.chat.sticky ? null : message._id;
    this.props.socketEdit(this.props.chat._id, { sticky });
  }

  renderMessages() {
    return this.props.messages
      .filter((message) => message.chat === this.props.chat._id)
      .map((message, i) => this.renderMessage(message, i));
  }

  renderSticky() {
    const sticky = this.props.chat.sticky;
    if (sticky) {
      // TODO. Find message in memory or retrieve it.
      const stickyMessage = this.props.messages
        .filter((message) => message._id === sticky && message.chat === this.props.chat._id)[0];
      return stickyMessage && this.renderMessage(stickyMessage, 0, true);
    }
  }

  renderMessage(message, i, isSticky) {
    return (
      <div className={`${styles.message} ${isSticky && styles.sticky}`} key={i}>
        <div className={styles.messageSenderImage}>
        </div>
        <div className={styles.messageInformation}>
          <div className={styles.messageHeader}>
            <span className={styles.messageSenderName}>{message.owner}</span>
            <div className={styles.messageRight}>
              <a className={styles.messageStick} onClick={() => this.stickMessage(message)}>
                <i className="fa fa-thumb-tack" title="Stick message"></i>
              </a>
              <span className={styles.messageTimestamp}>
                {message.createdAt}
                {message.createdAt != message.updatedAt && <span className={styles.messageEdited}>(edited)</span>}
              </span>
            </div>
          </div>
          {this.renderMessageContent(message, styles)}
        </div>
      </div>
    );
  }

  renderMessageContent(message) {
    // Code snippet.
    if (message.type === 'code') {
      const language = message.specifics && message.specifics.language;
      const highlight = message.specifics && message.specifics.highlight;

      return (
        <pre data-line={highlight} className={styles.snippet}>
          <code className={`language-${language}`}>
            {message.content}
          </code>
        </pre>
      );
    }

    // Plain text (render with Markdown).
    return (
      <div
        className={styles.messageContent}
        dangerouslySetInnerHTML={{__html: marked(message.content)}}
      />
    );
  }

  render() {
    return (
      <div className={styles.roomChatHistory}>
        <div className={styles.stickies}>
          {this.renderSticky()}
        </div>
        <ScrollContainer>
            <div className={styles.loadMore}>
              Load more
            </div>
            {this.renderMessages()}
        </ScrollContainer>
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

  socketEdit: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { retrieveMessages, socketEdit })(RoomChatHistory);