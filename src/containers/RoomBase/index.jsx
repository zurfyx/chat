import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { retrieve as retrieveRoom } from 'redux/modules/room';
import { retrieve as retrieveChat } from 'redux/modules/chat';
import RoomSidebar from 'containers/RoomSidebar';
import RoomChat from 'containers/RoomChat';

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
      });
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
    return (
      <div>
        {this.state.modal && <div className="modal" onClick={this.destroyModal}>{this.state.modal}</div>}
        {!this.state.loaded
          ? <span>Loading...</span>
          : <div className="row">
              <RoomSidebar createModal={this.createModal} />
              <RoomChat />
            </div>}
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
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    routing: state.routing,

    isRetrievingRoom: state.room.isRetrieving,
    roomRetrieveError: state.room.retrieveError,
    rooms: state.room.retrieveResult,
  }
};

export default connect(mapStateToProps, { retrieveRoom, retrieveChat })(RoomBase);