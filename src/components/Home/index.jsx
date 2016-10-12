import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    require('./home.scss');
    return (
      <div className="homePage">
        <h1>Hello world!</h1>
      </div>
    )
  }
}