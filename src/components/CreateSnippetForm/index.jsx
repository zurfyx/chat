import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import CodeFieldComponent from 'components/CodeFieldComponent';

class CreateChatRoom extends Component {
  render() {
    const styles = require('./CreateSnippetForm.scss');
    const { error, handleSubmit, onSubmit, submitting  } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.CreateSnippetForm}>
        <div className="field-container">
          <label>Language</label>
          <Field name="language" component="select">
            <option value="plain">Plain</option>
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="javascript">JavaScript</option>
            <option value="css">CSS</option>
          </Field>
        </div>

        <div className="field-container">
          <Field
            name="code"
            label="Code"
            placeholder="Your code"
            component={CodeFieldComponent} />
        </div>

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

  if (!values.code) {
    errors.code = 'Code cannot be blank';
  }

  return errors;
};

export default reduxForm({
  form: 'createSnippet',
  validate
})(CreateChatRoom);