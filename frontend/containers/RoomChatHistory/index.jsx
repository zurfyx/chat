import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { retrieve as retrieveMessages, retrieveAppend as retrieveAppendMessages } from 'redux/modules/message';
import { socketEdit } from 'redux/modules/chat';
import ScrollContainer from 'components/ScrollContainer';
import Message from 'components/Message';

import styles from './RoomChatHistory.scss';

export class RoomChatHistory extends Component {
  constructor(props) {
    super(props);

    this.stickMessage = this.stickMessage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.filterSticky = this.filterSticky.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
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

  loadMore(chatId) {
    this.props.retrieveAppendMessages(chatId);
  }

  filterMessages() {
    console.info(this.props.messages);
    return this.props.messages 
      ? this.props.messages.filter((message) => message.chat === this.props.chat._id)
      : [];
  }

  filterSticky() {
    const sticky = this.props.chat.sticky;
    if (sticky) {
      // TODO. Find message in memory or retrieve it.
      return this.props.messages &&
        this.props.messages.filter((message) => message._id === sticky && message.chat === this.props.chat._id)[0];
    }
  }

  render() {
    const { messages } = this.props;

    return (
      <div className={styles.roomChatHistory}>
        <div className={styles.stickies}>
            {this.filterSticky() &&
              <Message
                messages={messages}
                message={this.filterSticky()}
                stickMessage={this.stickMessage}
                loadMore={this.loadMore}
                isSticky={true}
              />
            }
        </div>
        <ScrollContainer>
            <div className={styles.loadMore}>Load more</div>
            {this.filterMessages().map(message =>
              <Message
                messages={messages}
                message={message}
                stickMessage={this.stickMessage}
                loadMore={this.loadMore}
                key={message._id}
              />
            )}
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

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,

    isRetrievingMessages: state.message.isRetrieving,
    retrieveMessagesError: state.message.retrieveError,
    messages: state.message.retrieveResult,
  }
};

export default connect(mapStateToProps, { retrieveMessages, retrieveAppendMessages, socketEdit })(RoomChatHistory);