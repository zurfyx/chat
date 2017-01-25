import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

import { fork } from 'redux/modules/chat';
import processEntry from './entry';

import styles from './Activity.scss';

export class Activity extends Component {
  constructor(props) {
    super(props);

    this.handleFork = this.handleFork.bind(this);
  }

  handleFork(e, data) {
    data.data()
      .then((result) => {
        const { title, content, type } = result;
        const initialMessage = { content, type };
        this.props.fork(this.props.chat._id, title, initialMessage);
      })
      .catch(() => {
        alert('There was an error when fetching information!');
      })
  }

  render() {
    const { icon='', user='', timestamp='', action='', target='', more={} } = processEntry(this.props.entry);

    return (
      <div className={styles.entryContainer}>
        {/* Visible */}
        <ContextMenuTrigger id={`contextmenu-${this.props.entry._id}`}>
          <div className={styles.entry}>
            <div className={styles.icon}><i className={`fa ${icon}`} aria-hidden="true"></i></div>
            <div className={styles.entryMain}>
              <header>
                <span className={styles.user}>{user}</span>
                <span className={styles.timestamp}>{timestamp}</span>
              </header>
              <span>{action}</span>
              <a className={styles.sha} title={target} target="_blank">{target}</a>
            </div>
          </div>
        </ContextMenuTrigger>
        {/* Context menu */}
        {more.fork && <ContextMenu id={`contextmenu-${this.props.entry._id}`}>
          <MenuItem data={{ data: more.fork }} onClick={this.handleFork}>
            Fork
          </MenuItem>
        </ContextMenu>}
      </div>
    );
  }
}

Activity.propTypes = {
  entry: PropTypes.object.isRequired,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.auth.user,
    chat: state.chat.activateResult,
  };
}

export default connect(mapStateToProps, { fork })(Activity);