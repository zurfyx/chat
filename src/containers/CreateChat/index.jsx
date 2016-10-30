import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { create } from 'redux/modules/chat';
import CreateChatForm from 'components/CreateChatForm';

export class CreateChat extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    return this.props.create(this.props.room[0], data.title, data.description)
      .then(() => {
        if (this.props.createError) {
          const errorMessage = `Chat creation failed! ${typeof this.props.createError.message === 'string' ? this.props.createError.message : ''}`;
          throw new SubmissionError({ _error: errorMessage });
        }

        // TODO Refresh room chats.
        return this.props.complete();
      });
  }

  render() {
    return (
      <div className="content box">
        <div className="form-container-2">
          <header>
            <h2>Create chat</h2>
          </header>
          <CreateChatForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

CreateChat.propTypes = {
  room: PropTypes.Array,
  complete: PropTypes.func.isRequired,

  create: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  createError: PropTypes.any,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    room: state.room.retrieveResult,

    isCreating: state.chat.isCreating,
    createError: state.chat.createError,
  }
};

export default connect(mapStateToProps, { create })(CreateChat);