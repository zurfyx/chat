import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RoomSidebar from 'containers/RoomSidebar';
import RoomChat from 'containers/RoomChat';

export class RoomBase extends Component {
  componentWillMount() {
    // TODO Socket connection.
    console.info('Socket connection...');
  }

  render() {
    return (
      <div className="row">
        <RoomSidebar />
        <RoomChat />
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {

  }
};

export default connect(mapStateToProps)(RoomBase);