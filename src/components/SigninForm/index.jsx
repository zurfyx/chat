import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'

const renderInput = field =>
  <div>
    <input {...field.input} type={field.type}/>
    {field.meta.touched &&
    field.meta.error &&
    <span className="error">{field.meta.error}</span>}
  </div>;


class SigninForm extends Component {
  render() {
    const { error, handleSubmit, onSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <Field
            name="email"
            component={renderInput}
            type="text" />
        </div>

        <div>
          <label>Password</label>
          <Field
            name="password"
            component={renderInput}
            type="password" />
        </div>

        <div>
          {error && <strong>{error}</strong>}
        </div>

        <button type="submit" disabled={submitting}>Sign in</button>
      </form>
    );
  }
}

SigninForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired
};

const validate = (values) => {
  const errors = {};

  const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!values.email) {
    errors.email = 'Email cannot be blank';
  } else if (!emailRe.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.password) {
    errors.password = 'Password cannot be blank';
  } else if (values.password.length < 4) {
    errors.password = 'Password cannot be shorter than 4 characters.'
  }

  return errors;
};

export default reduxForm({
  form: 'signin',
  validate
})(SigninForm);