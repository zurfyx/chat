import React, { Component, PropTypes } from 'react';
import marked from 'marked';

// Prism code highlight libraries.
import Prism from 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-highlight/prism-line-highlight.css';

import styles from './Message.scss';

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

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.renderMessageContent = this.renderMessageContent.bind(this);
  }

  renderMessageContent() {
    const { messages, message, loadMore } = this.props;

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

    // Fork.
    if (message.type === 'fork') {
      const forkChatId = message.specifics && message.specifics.chat;
      return (
        <div>
          <div
            className={styles.messageContent}
            dangerouslySetInnerHTML={{__html: marked(message.content)}}
          />
          <a className={styles.loadMoreFork} onClick={() => loadMore(forkChatId)}>[+] load more messages</a>

          <div className={styles.indent}>
            {this.props.messages
              .filter(message => message.chat === forkChatId)
              .map(message => 
                <Message
                  messages={messages}
                  message={message}
                  stickMessages={this.stickMessage}
                  loadMore={this.loadMore}
                  key={message._id}
                />
            )}
          </div>
        </div>
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
    const { message, isSticky, stickMessage } = this.props;

    return (
      <div className={`${styles.message} ${isSticky && styles.sticky}`}>
        <div className={styles.messageSenderImage}>
        </div>
        <div className={styles.messageInformation}>
          <div className={styles.messageHeader}>
            <span className={styles.messageSenderName}>{message.owner}</span>
            <div className={styles.messageRight}>
              <a className={styles.messageStick} onClick={() => stickMessage(message)}>
                <i className="fa fa-thumb-tack" title="Stick message"></i>
              </a>
              <span className={styles.messageTimestamp}>
                {message.createdAt}
                {message.createdAt != message.updatedAt && <span className={styles.messageEdited}>(edited)</span>}
              </span>
            </div>
          </div>
          {this.renderMessageContent()}
        </div>
      </div>
    );
  }
}

Message.PropTypes = {
  messages: PropTypes.Array, // All cached messages.
  message: PropTypes.object.isRequired,
  isSticky: PropTypes.bool,

  stickMessage: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
}