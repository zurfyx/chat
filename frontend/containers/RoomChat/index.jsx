import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RoomChatActivity from 'containers/RoomChatActivity';
import RoomChatHistory from 'containers/RoomChatHistory';
import RoomChatMessage from 'components/RoomChatMessage';
import EditableText from 'components/EditableText';
import { socketEdit, forkMerge } from 'redux/modules/chat';

export class RoomChat extends Component {
  constructor(props) {
    super(props);

    this.editChatTitle = this.editChatTitle.bind(this);
    this.editChatDescription = this.editChatDescription.bind(this);
    this.handleForkMerge = this.handleForkMerge.bind(this);
  }

  editChatTitle(title) {
    if (title === this.props.chat.title) return;
    this.props.socketEdit(this.props.chat._id, { title });
  }


  editChatDescription(description) {
    if (description === this.props.chat.description) return;
    this.props.socketEdit(this.props.chat._id, { description });
  }

  handleForkMerge() {
    this.props.forkMerge(this.props.chat._id);
  }

  render() {
    const styles = require('./RoomChat.scss');
    const { chat } = this.props;

    return (
      <div className={styles.roomChatPage}>
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderTitle}>
            {chat.parent && <i className="fa fa-code-fork" aria-hidden="true" onClick={this.handleForkMerge}></i>}
            <h3><EditableText value={chat.title} defaultValue="Chat title" onSubmit={this.editChatTitle} /></h3>
          </div>
          <EditableText value={chat.description} defaultValue="Description" onSubmit={this.editChatDescription} />
        </div>

        <div className={styles.chatMain}>
          <div className={styles.chatContent}>
            <RoomChatHistory />
            <RoomChatMessage />
          </div>
          <RoomChatActivity />
        </div>
      </div>
    );
  }
}

RoomChat.PropTypes = {
  socketEdit: PropTypes.func.isRequired,
  forkMerge: PropTypes.func.isRequired,

  chat: PropTypes.element.isRequired,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,
  }
};

export default connect(mapStateToProps, { socketEdit, forkMerge })(RoomChat);