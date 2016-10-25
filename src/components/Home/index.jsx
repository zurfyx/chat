import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    const styles = require('./home.scss');
    return (
      <div className="homePage">
        <h1>Hello world!</h1>
      </div>
    )
  }
}