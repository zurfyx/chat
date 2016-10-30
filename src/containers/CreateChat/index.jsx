import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { create, retrieve } from 'redux/modules/chat';
import CreateChatForm from 'components/CreateChatForm';

export class CreateChat extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { create, rooms, createError } = this.props;
    const room = rooms[0];

    return create(room, data.title, data.description)
      .then(() => {
        if (createError) {
          const errorMessage = `Chat creation failed! ${typeof createError.message === 'string' ? createError.message : ''}`;
          throw new SubmissionError({ _error: errorMessage });
        }

        // Retrieve updated list of chats.
        return this.props.retrieve(room);
      })
      .then(() => {
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
  retrieve: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  createError: PropTypes.any,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    rooms: state.room.retrieveResult,

    isCreating: state.chat.isCreating,
    createError: state.chat.createError,
  }
};

export default connect(mapStateToProps, { create, retrieve })(CreateChat);