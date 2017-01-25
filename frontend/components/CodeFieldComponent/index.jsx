import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import CodeMirror from 'react-codemirror';

export default class CodeFieldComponent extends Component {
  render() {
    require('../../../node_modules/codemirror/lib/codemirror.css');

    const field = this.props;

    return (
      <div className="field-container">
        {field.label && <label>{field.label}</label>}
        <CodeMirror {...field.input} options={{ lineNumbers: true }} />
        {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      </div>
    );
  }
}