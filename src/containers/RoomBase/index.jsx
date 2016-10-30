import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { retrieve as retrieveRoom } from 'redux/modules/room';
import RoomSidebar from 'containers/RoomSidebar';
import RoomChat from 'containers/RoomChat';

export class RoomBase extends Component {
  constructor(props) {
    super(props);

    this.params = { // Expecting: /room/room-name/chat-name.
      room: props.routing.locationBeforeTransitions.pathname.split('/')[2],
      chat: props.routing.locationBeforeTransitions.pathname.split('/')[3],
    };

    this.state = {};

    this.createModal = this.createModal.bind(this);
    this.destroyModal = this.destroyModal.bind(this);
    this.handleCreateChat = this.handleCreateChat.bind(this);
  }

  componentWillMount() {
    // TODO Socket connection.
    console.info('Socket connection...');

    // Retrieve room details.
    this.props.retrieveRoom({ slug: this.params.room }).then(() => {
      // Retrieve room chats.
      const id = this.props.room[0]._id;
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

  handleCreateChat() {

  }

  render() {
    return (
      <div>
        {this.state.modal && <div className="modal" onClick={this.destroyModal}>{this.state.modal}</div>}
        {this.isRetrievingRoom
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
  room: PropTypes.Array,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    routing: state.routing,

    isRetrievingRoom: state.room.isRetrieving,
    roomRetrieveError: state.room.retrieveError,
    room: state.room.retrieveResult,
  }
};

export default connect(mapStateToProps, { retrieveRoom })(RoomBase);