import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import FieldComponent from 'components/FieldComponent';

class CreateChatRoom extends Component {
  render() {
    const { error, handleSubmit, onSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="title"
          label="Title *"
          placeholder="General"
          component={FieldComponent}
          type="text" />

        <Field
          name="description"
          label="Description"
          placeholder="A brief description of the chat."
          component={FieldComponent}
          type="text" />

        <Field
          name="github"
          label="Github repository"
          placeholder="octocat/Hello_world"
          component={FieldComponent}
          type="text" />

        <div className="field-container">
          <button type="submit" disabled={submitting}>Create</button>
        </div>

        <div className="field-container">
          {error && <span className="error">{error}</span>}
        </div>
      </form>
    );
  }
}

CreateChatRoom.PropTypes = {
  onSubmit: PropTypes.func.isRequired
};

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title cannot be blank';
  }

  return errors;
};

export default reduxForm({
  form: 'createChat',
  validate
})(CreateChatRoom);