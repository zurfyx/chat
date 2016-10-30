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

    return (
      <div className={styles.roomSidebarPage}>
        <div>
          <div className={styles.roomInfo}>
            <a className={styles.roomTitle}>
              <h2>My Room</h2>
            </a>
          </div>
          <div className="chatListContainer">
            <div className="chatListSummary">
              <button className={styles.new} onClick={this.handleNewChat}>+</button>
              Chats (2)
            </div>
            <ul className={styles.chatList}>
              <li>/my-first-chat</li>
              <li>/my-second-chat</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

RoomSidebar.PropTypes = {
  createModal: PropTypes.func.isRequired,

  room: PropTypes.Array,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    room: state.room.retrieveResult,
  }
};

export default connect(mapStateToProps)(RoomSidebar);