import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    const styles = require('./home.scss');
    return (
      <div className={styles.homePage}>
        <div className={`${styles.intro} full-center`}>
          <h1>nyao.io is a specialised chat for programmers</h1>
          <button className="big-transparent-button">Create room</button>
          <button className="big-transparent-button">Explore rooms</button>
        </div>
      </div>
    )
  }
}