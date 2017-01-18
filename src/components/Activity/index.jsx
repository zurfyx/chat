import React, { Component, PropTypes } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

import processEntry from './entry';

import styles from './Activity.scss';

export default class Activity extends Component {
  constructor(props) {
    super(props);

    this.handleFork = this.handleFork.bind(this);
  }

  handleFork(e, data) {
    console.info('it works');
    console.info(data);
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
        <ContextMenu id={`contextmenu-${this.props.entry._id}`}>
          <MenuItem data={{ data: more.fork }} onClick={this.handleFork}>
            Fork
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
}

Activity.propTypes = {
  entry: PropTypes.object.isRequired,
};