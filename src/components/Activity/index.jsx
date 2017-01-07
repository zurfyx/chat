import React, { Component, PropTypes } from 'react';

import processEntry from './entry';

import styles from './Activity.scss';

export default class Activity extends Component {
  render() {
    const { icon='', user='', timestamp='', action='', target='' } = processEntry(this.props.entry);

    return (
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
    );
  }
}

Activity.propTypes = {
  entry: PropTypes.string.isRequired,
};