import React, { Component, PropTypes } from 'react';

import styles from './EditableText.scss';

export default class EditableText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      isEditing: false,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.submit = this.submit.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderText = this.renderText.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  submit(e) {
    e.preventDefault();
    this.toggleEdit();
    this.props.onSubmit(this.state.value);
  }

  onChangeValue(e) {
    this.setState({ value: e.target.value });
  }

  renderText() {
    const value = this.state.value;
    return (
      <span className={`${styles.text} ${!value && styles.defaultText}`} onClick={this.toggleEdit}>
        {value || this.props.defaultValue}
      </span>
    );
  }

  renderInput() {
    return (
      <form className={styles.edit} onSubmit={this.submit}>
        <input type="text" value={this.state.value} onChange={this.onChangeValue} autoFocus />
      </form>
    );
  }

  render() {
    return this.state.isEditing ? this.renderInput() : this.renderText();
  }
}

EditableText.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};