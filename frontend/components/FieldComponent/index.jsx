import React, { Component } from 'react';

export default class FieldComponent extends Component {
  render() {
    const field = this.props;

    return (
      <div className="field-container">
        {field.label && <label>{field.label}</label>}
        <input {...field.input} type={field.type} placeholder={field.placeholder} />
        {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      </div>
    );
  }
}