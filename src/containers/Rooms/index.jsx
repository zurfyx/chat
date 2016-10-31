import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { retrieve } from 'redux/modules/room';

export class Rooms extends Component {
  componentWillMount() {
    this.props.retrieve();
  }

  render() {
    const styles = require('./Rooms.scss');
    const { retrieving, retrieveError, retrieveResult } = this.props;

    const cards = () => this.props.retrieveResult.map((room, i) => {
      return (
        <li className="card" key={i}>
          <Link to={`/room/${room.slug}`} className="title">{room.title}</Link>
          <span className="subtitle">{room.slug}</span>
          <span className="description">{room.description}</span>
          <span className="members">Members: {room.members.length}</span>
        </li>
      );
    });

    return (
      <div className="page">
        <div className="content">
          <Link to="/rooms/new">
            <button className={`transparent ${styles.h2Button}`}>Create room</button>
          </Link>
          <h2>Explore</h2>
          <div className="search">
            <input type="text" placeholder="Room name" />
          </div>
          {retrieving && <span>...</span>}
          {!retrieving && retrieveError && <span>{retrieveError}</span>}
          {!retrieving && retrieveResult && <ul className="card-list">{cards()}</ul>}
        </div>
      </div>
    );
  }
}

Rooms.propTypes = {
  retrieve: PropTypes.func.isRequired,
  isRetrieving: PropTypes.bool,
  retrieveError: PropTypes.any,
  retrieveResult: PropTypes.array,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isRetrieving: state.room.isRetrieving,
    retrieveError: state.room.retrieveError,
    retrieveResult: state.room.retrieveResult,
  }
};

export default connect(mapStateToProps, { retrieve })(Rooms);