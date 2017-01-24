import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

import { send as sendMessage } from 'redux/modules/message';

export class RoomChatMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formContent: '',
    };

    this.handleFormKeyDown = this.handleFormKeyDown.bind(this);
    this.handleFormContentChange = this.handleFormContentChange.bind(this);
    this.handleSendTextMessage = this.handleSendTextMessage.bind(this);
  }

  handleFormKeyDown(e) {
    // Form can be submitted through the input message textarea too!
    // That is by using the Enter key (Shift-Enter for new lines).
    if (e.keyCode === 13 && !e.shiftKey) {
      this.handleSendTextMessage(e);
    }
  }

  handleFormContentChange(e) {
    this.setState({ formContent: e.target.value });
  }

  handleSendTextMessage(e) {
    e.preventDefault();

    if (this.state.formContent !== '') {
      this.props.sendMessage(this.props.chat._id, this.state.formContent, 'plain');
      this.setState({formContent: ''});
    }
  }

  render() {
    const styles = require('./MessageForm.scss');

    return (
      <form className={styles.chatForm}
            onKeyDown={this.handleFormKeyDown}
            onSubmit={this.handleSendTextMessage}>
        <Textarea
          type="text"
          placeholder="Type a message"
          required
          value={this.state.formContent}
          onChange={this.handleFormContentChange}
        />
      </form>
    );
  }
}

RoomChatMessage.PropTypes = {
  chat: PropTypes.element,

  sendMessage: PropTypes.func.isRequired,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,
  }
};

export default connect(mapStateToProps, { sendMessage })(RoomChatMessage);