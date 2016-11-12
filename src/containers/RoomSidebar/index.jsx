import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { retrieve as retrieveRooms } from 'redux/modules/room';
import { retrieve as retrieveChats, activate as activateChat } from 'redux/modules/chat';
import CreateChat from 'containers/CreateChat';

export class RoomSidebar extends Component {
  constructor(props) {
    super(props);

    this.handleNewChat = this.handleNewChat.bind(this);
    this.handleActivateChat = this.handleActivateChat.bind(this);
  }

  componentWillMount() {
    /*
     * - Retrieve Room information (we only have the slug now).
     * - Retrieve Room Chats and activate the one that is in the URL (skip if
     * wasn't specified). Activating will enable ChatRoom.
     */
    this.props.retrieveRooms(this.props.params.room).then(() => {
      // In order to retrieve room chats, we required its _id first.
      this.props.retrieveChats(this.props.rooms[0]._id);
    });

    if (this.props.params.chat) {
      this.props.activateChat(this.props.params.chat);
    }
  }

  handleNewChat() {
    {this.props.createModal(<CreateChat complete={this.props.createModal} />);}
  }

  handleActivateChat(chatId) {
    this.props.activateChat(chatId);
  }

  render() {
    const styles = require('./RoomSidebar.scss');
    const { rooms, chats, handleActiveChat } = this.props;

    const chatsList = chats.map((chat, i) =>
      <a key={i} onClick={() => handleActiveChat(chat._id)}>
        <li>{chat.title}</li>
      </a>
    );

    return (
      <div className={styles.roomSidebarPage}>
        <div>
          <div className={styles.roomInfo}>
            <a className={styles.roomTitle}>
              <h2>{rooms && rooms[0].title}</h2>
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

  params: PropTypes.shape({
    room: PropTypes.string.isRequired,
    chat: PropTypes.string,
  }),

  retrieveRooms: PropTypes.func.isRequired,
  isRetrievingRooms: PropTypes.bool,
  roomRetrieveError: PropTypes.any,
  rooms: PropTypes.Array,

  retrieveChats: PropTypes.func.isRequired,
  isRetrievingChats: PropTypes.bool,
  chatRetrieveError: PropTypes.any,
  chats: PropTypes.Array,

  activateChat: PropTypes.func.isRequired,
  isActivatingChat: PropTypes.bool,
  activateChatError: PropTypes.any,
  activeChat: PropTypes.element,
};

RoomSidebar.defaultProps = {
  chats: [],
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isRetrievingRooms: state.room.isRetrieving,
    roomRetrieveError: state.room.retrieveError,
    rooms: state.room.retrieveResult,

    isRetrievingChats: state.chat.isRetrieving,
    chatRetrieveError: state.chat.retrieveError,
    chats: state.chat.retrieveResult,

    isActivatingChat: state.chat.isActivating,
    activateChatError: state.chat.activateError,
    activeChat: state.chat.activateResult,
  }
};

export default connect(mapStateToProps, { retrieveRooms, retrieveChats, activateChat })(RoomSidebar);