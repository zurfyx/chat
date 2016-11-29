import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { connect as connectSocket, disconnect as disconnectSocket } from 'redux/modules/socket';
import { enter as enterRoom } from 'redux/modules/room';
import { receive as receiveMessages } from 'redux/modules/message';
import RoomSidebar from 'containers/RoomSidebar';
import RoomChatLoader from 'containers/RoomChatLoader';

export class RoomBase extends Component {
  constructor(props) {
    super(props);

    this.params = { // Expecting: /room/room-name/chat-name.
      room: props.routing.locationBeforeTransitions.pathname.split('/')[2],
      chat: props.routing.locationBeforeTransitions.pathname.split('/')[3],
    };

    // The page is considered loaded when the socket has connected to the room successfully.
    this.state = {
      loaded: false,
    };

    this.createModal = this.createModal.bind(this);
    this.destroyModal = this.destroyModal.bind(this);
  }

  componentWillMount() {
    /*
     * 1. Connect to Socket.
     * 2. Enter Room.
     * 3. Listen for new messages.
     */
    this.props.connectSocket()
      .then(() => {
        return this.props.enterRoom(this.params.room);
      })
      .then(() => {
        return this.props.receiveMessages();
      })
      .then(() => {
        this.setState({ loaded: true });
      });
  }

  componentWillUnmount() {
    /*
     * Disconnect from Socket.
     * Will prevent the user from "running out of sockets" if he enters - leaves
     * rooms too quickly.
     */
    return this.props.disconnectSocket();
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
    const loadingPage = <div>
      Loading... (taking too long?)
      {this.props.connectError}
    </div>;
    const loadedPage = <div className="row">
      {/* Full page modal */}
      {this.state.modal && <div className="modal" onClick={this.destroyModal}>{this.state.modal}</div>}

      {/* Sidebar */}
      {/*{this.params.room}*/}
      <RoomSidebar params={this.params} createModal={this.createModal} />

       {/* Chat
         * Why does RoomChat require loaded, and not the sidebar?
         * 1. Socket is not ready yet, sending messages would throw ugly errors.
         * 2. (most important) If messages history is retrieved before client is
         * connected to server socket it might miss messages (the newest ones
         * that have arrived after retrieving from AJAX API to Entering the Room
         * through socket. */}
      {this.state.loaded && <RoomChatLoader />}
    </div>;

    return this.state.loaded ? loadedPage : loadingPage;
  }
}

RoomSidebar.PropTypes = {
  routing: PropTypes.element.isRequired,

  connectSocket: PropTypes.func.isRequired,
  isConnecting: PropTypes.bool,
  connectError: PropTypes.any,

  disconnectSocket: PropTypes.func.isRequired,
  isDisconnecting: PropTypes.bool,
  disconnectError: PropTypes.any,

  enterRoom: PropTypes.func.isRequired,

  receiveMessages: PropTypes.func.isRequired,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    routing: state.routing,

    isConnecting: state.socket.isConnecting,
    connectError: state.socket.connectError,

    isDisconnecting: state.socket.isDisconnecting,
    disconnectError: state.socket.disconnectError,
  }
};

export default connect(mapStateToProps, { connectSocket, disconnectSocket, enterRoom, receiveMessages })(RoomBase);