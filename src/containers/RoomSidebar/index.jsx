import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CreateChat from 'containers/CreateChat';

export class RoomSidebar extends Component {
  constructor(props) {
    super(props);

    this.handleNewChat = this.handleNewChat.bind(this);
  }

  handleNewChat() {
    {this.props.createModal(<CreateChat complete={this.props.createModal} />);}
  }

  render() {
    const styles = require('./RoomSidebar.scss');
    const { rooms, chats, changeActiveChat } = this.props;
    const room = rooms[0];

    const chatsList = chats.map((chat, i) =>
      <a key={i} onClick={() => changeActiveChat(chat._id)}>
        <li>{chat.title}</li>
      </a>
    );

    return (
      <div className={styles.roomSidebarPage}>
        <div>
          <div className={styles.roomInfo}>
            <a className={styles.roomTitle}>
              <h2>{room.title}</h2>
            </a>
          </div>
          <div className="chatListContainer">
            <div className="chatListSummary">
              <button className={styles.new} onClick={this.handleNewChat}>+</button>
              Chats ({chats.length})
            </div>
            <ul className={styles.chatList}>
              {chatsList}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RoomSidebar.PropTypes = {
  createModal: PropTypes.func.isRequired,
  changeActiveChat: PropTypes.func.isRequired,

  rooms: PropTypes.Array,
  chats: PropTypes.Array,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    rooms: state.room.retrieveResult,
    chats: state.chat.retrieveResult,
  }
};

export default connect(mapStateToProps)(RoomSidebar);