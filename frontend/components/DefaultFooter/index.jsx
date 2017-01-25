import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const styles = require('./DefaultFooter.scss');
    return (
      <footer className={styles.footerPage}>
        Copyright&copy; 2016
      </footer>
    )
  }
}