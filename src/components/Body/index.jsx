import React, { Component, PropTypes } from 'react';

import Header from 'components/Header';

export default class Body extends Component {
  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <div className="content">
          {this.children}
        </div>
      </div>
    );
  }
}

Body.PropTypes = {
  children: PropTypes.element.isRequired,

  user: PropTypes.object,
};