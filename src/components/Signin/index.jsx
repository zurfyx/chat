import React, { Component } from 'react';
import { connect } from 'react-redux';

import SigninForm from 'components/SigninForm';

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleSignin = this.handleSignin.bind(this);
  }
  handleSignin(data) {
    console.info('about to dispatch');
    console.info(data);
  }
  render() {
    return (
      <SigninForm onSubmit={this.handleSignin} {...this.props} />
    );
  }
}

Signin.propTypes = {

};

export const SigninContainer = connect()(Signin);