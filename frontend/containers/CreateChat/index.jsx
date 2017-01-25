import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { create, subscribeGithub, retrieve } from 'redux/modules/chat';
import CreateChatForm from 'components/CreateChatForm';

export class CreateChat extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { rooms, create, createError, subscribeGithub, subscribeGithubError } = this.props;
    const roomId = rooms[0]._id;

    return Promise.resolve()
      .then(() => {
        // GitHub subscription.
        if (data.github) {
          return subscribeGithub(data.github);
        }
      })
      .then(() => {
        // Verify GitHub subscription.
        if (data.github && subscribeGithubError) {
          const errorMessage = `GitHub subscription failed! ${subscribeGithubError}`;
          throw new SubmissionError({ _error: errorMessage });
        }
      })
      .then(() => create(roomId, data.title, data.description, data.github))
      .then(() => {
        if (createError) {
          const errorMessage = `Chat creation failed! ${typeof createError.message === 'string' ? createError.message : ''}`;
          throw new SubmissionError({ _error: errorMessage });
        }

        // Retrieve updated list of chats.
        return this.props.retrieve(roomId);
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

CreateChat.PropTypes = {
  complete: PropTypes.func.isRequired,

  rooms: PropTypes.Array,

  retrieve: PropTypes.func.isRequired,

  create: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  createError: PropTypes.any,

  subscribeGithub: PropTypes.func.isRequired,
  isSubscribingGithub: PropTypes.bool,
  subscribeGithubError: PropTypes.any,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    rooms: state.room.retrieveResult,

    isCreating: state.chat.isCreating,
    createError: state.chat.createError,

    isSubscribingGithub: state.chat.isSubscribingGithub,
    subscribeGithubError: state.chat.subscribeGithubError,
  }
};

export default connect(mapStateToProps, { create, subscribeGithub, retrieve })(CreateChat);