import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { retrieve as retrieveRoom } from 'redux/modules/room';
import { retrieve as retrieveChat, activate as activateChat } from 'redux/modules/chat';
import RoomSidebar from 'containers/RoomSidebar';
import RoomChat from 'containers/RoomChat';

const NoChatAvailable = () => (
  <div className="full-center">
    <h1 className="thin">No chats were found!</h1>
    <button>Create</button>
  </div>
);

const RoomChatError = () => (
  <span>There was an error retrieving the chat (does it exist?)</span>
);

const NoChatSelected = () => (
  <span>No chat selected</span>
);

export class RoomBase extends Component {
  constructor(props) {
    super(props);

    this.params = { // Expecting: /room/room-name/chat-name.
      room: props.routing.locationBeforeTransitions.pathname.split('/')[2],
      chat: props.routing.locationBeforeTransitions.pathname.split('/')[3],
    };

    this.state = {
      loaded: false,
    };

    this.activateChat = this.activateChat.bind(this);
    this.createModal = this.createModal.bind(this);
    this.destroyModal = this.destroyModal.bind(this);
  }

  componentWillMount() {
    // TODO Socket connection.
    console.info('Socket connection...');

    // Retrieve room details.
    this.props.retrieveRoom({ slug: this.params.room })
      .then(() => {
        // Retrieve room chats.
        return this.props.retrieveChat(this.props.rooms[0]);
      })
      .then(() => {
        this.setState({ loaded: true });

        this.activateChat();
      });
  }

  activateChat() {
    // Activate a chat (defined in the URI).
    if (this.params.chat) {
      this.props.activateChat(this.params.chat);
    }
  }

  createModal(element) {
    this.setState({ modal: element });
  }

  destroyModal(e) {
    if (e.target.className.indexOf('modal') !== -1) {
      this.createModal();
    }
  }

  render() {
    const { chats } = this.props;

    return (
      <div className="row">
        {/* Modal */}
        {this.state.modal && <div className="modal" onClick={this.destroyModal}>{this.state.modal}</div>}

        {/* Sidebar */}
        {!this.state.loaded && <span>Loading...</span>}
        {this.state.loaded && <RoomSidebar createModal={this.createModal} />}

        {/* Chat */}
        {this.props.isActivatingChat && <span>Loading chat...</span>}
        {this.state.loaded && !this.props.isActivatingChat && this.props.activeChat && <RoomChat />}
        {this.state.loaded && !this.props.isActivatingChat && this.props.activateChatError && <RoomChatError />}
        {this.state.loaded && !this.props.isActivatingChat && !this.props.activeChat && !this.props.activateChatError && <NoChatSelected />}
      </div>
    );
  }
}

RoomSidebar.PropTypes = {
  routing: PropTypes.element.isRequired,

  retrieveRoom: PropTypes.func.isRequired,
  isRetrievingRoom: PropTypes.bool,
  roomRetrieveError: PropTypes.any,
  rooms: PropTypes.Array,

  retrieveChat: PropTypes.func.isRequired,
  chats: PropTypes.Array,

  activateChat: PropTypes.func.isRequired,
  activate: PropTypes.bool,
  activateChatError: PropTypes.any,
  activeChat: PropTypes.element,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    routing: state.routing,

    isRetrievingRoom: state.room.isRetrieving,
    roomRetrieveError: state.room.retrieveError,
    rooms: state.room.retrieveResult,

    chats: state.chat.retrieveResult,

    isActivatingChat: state.chat.isActivating,
    activateChatError: state.chat.activateError,
    activeChat: state.chat.activateResult,
  }
};

export default connect(mapStateToProps, { retrieveRoom, retrieveChat, activateChat })(RoomBase);