import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import FieldComponent from 'components/FieldComponent';

class CreateRoomForm extends Component {
  render() {
    const { error, handleSubmit, onSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="title"
          label="Title *"
          placeholder="Assembly language"
          component={FieldComponent}
          type="text" />

        <Field
          name="slug"
          label="Slug /your-url-name-here *"
          placeholder="assembly-language"
          component={FieldComponent}
          type="text" />

        <Field
          name="description"
          label="Description"
          placeholder="A brief description of my repository."
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

CreateRoomForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired
};

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title cannot be blank';
  }

  if (!values.slug) {
    errors.slug = 'Slug cannot be blank';
  }

  return errors;
};

export default reduxForm({
  form: 'createRoom',
  validate
})(CreateRoomForm);