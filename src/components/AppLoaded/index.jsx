import React, { Component, PropTypes } from 'react';

export default class AppLoaded extends Component {
  render() {
    const styles = require('./AppLoaded.scss');
    return (
      <div className={styles.appLoadedPage}>
        {this.props.header}
        {this.props.main}
        {this.props.footer}
      </div>
    );
  }
}

AppLoaded.PropTypes = {
  header: PropTypes.element,
  main: PropTypes.element.isRequired,
  footer: PropTypes.element,
};