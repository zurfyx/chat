import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RoomChat from 'containers/RoomChat';

class RoomChatLoader extends Component {
  render() {
    if (this.props.isActivating) {
      return <span>Loading...</span>;
    } else if (this.props.activateError) {
      return <span>Invalid chat</span>;
    } else if (!this.props.activateResult && !this.props.activateError) {
      return <span>Select chat</span>;
    } else {
      return <RoomChat />;
    }
  }
}

RoomChatLoader.PropTypes = {
  activateError: PropTypes.bool,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isActivating: state.chat.isActivating,
    activateError: state.chat.activateError,
    activateResult: state.chat.activateResult,
  }
};

export default connect(mapStateToProps)(RoomChatLoader);