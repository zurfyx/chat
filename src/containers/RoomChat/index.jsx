import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RoomChatHistory from 'containers/RoomChatHistory';
import RoomChatMessage from 'components/RoomChatMessage';
import EditableText from 'components/EditableText';
import { socketEdit } from 'redux/modules/chat';

export class RoomChat extends Component {
  constructor(props) {
    super(props);

    this.editChatTitle = this.editChatTitle.bind(this);
    this.editChatDescription = this.editChatDescription.bind(this);
  }

  editChatTitle(title) {
    if (title === this.props.chat.title) return;
    socketEdit(this.props.chat._id, { title });
  }


  editChatDescription(description) {
    if (description === this.props.chat.description) return;
    socketEdit(this.props.chat._id, { description });
  }

  render() {
    const styles = require('./RoomChat.scss');
    const { chat } = this.props;

    return (
      <div className={styles.roomChatPage}>
        <div className={styles.chatHeader}>
          <h3><EditableText value={chat.title} defaultValue="Chat title" onSubmit={this.editChatTitle} /></h3>
          <EditableText value={chat.description} defaultValue="Description" onSubmit={this.editChatDescription} />
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