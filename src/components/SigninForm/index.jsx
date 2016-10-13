import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

export const fields = [ 'username', 'email', 'age' ]

class SigninForm extends Component {
  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" {...email} />
        {email.error && email.touched && <div>{email.error}</div>}

        {/*<label>Password</label>*/}
        {/*<input type="password" {...password} />*/}
        {/*{password.error && password.touched && <div>{password.error}</div>}*/}

        <button type="submit">Sign in</button>
      </form>
    );
  }
}

const validate = (data, props) => {
  const errors = {};

  if (!data.email) {
    errors.email = 'Email cannot be blank';
  } else if (!email.test(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password) {
    errors.password = 'Password cannot be blank';
  } else if (data.password.length < 4) {
    errors.password = 'Password cannot be shorter than 4 characters.'
  }

  return errors;
};

SigninForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

SigninForm = reduxForm({
  form: 'signin',
  fields,
  validate
})(SigninForm);

export default SigninForm;