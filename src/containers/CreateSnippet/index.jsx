import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { send as create } from 'redux/modules/message';
import CreateSnippetForm from 'components/CreateSnippetForm';

export class CreateSnippet extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { create, complete } = this.props;
    const { language, code, highlight } = data;
    const chatId = this.props.chat._id;
    const dbLanguage = language ? language : 'plain'; // TODO: move to default form values.

    return create(chatId, code, 'code', { language: dbLanguage, highlight })
      .then(() => {
        // TODO: Error validation.

        complete();
      });
  }

  render() {
    return (
      <div className="form-container-modal">
        <header>
          <h2>Create snippet</h2>
        </header>
        <CreateSnippetForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

CreateSnippet.propTypes = {
  create: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,
  };
};

export default connect(mapStateToProps, { create })(CreateSnippet);