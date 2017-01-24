import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { create } from 'redux/modules/room';
import CreateRoomForm from 'components/CreateRoomForm';

export class CreateRoom extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { title, slug, description } = data;
    return this.props.create(title, slug, description)
      .then(() => {
        if (this.props.createError) {
          const errorMessage = `Room creation failed! ${typeof this.props.createError.message === 'string' ? this.props.createError.message : ''}`;
          throw new SubmissionError({ _error: errorMessage });
        }

        return browserHistory.push(`/room/${slug}`);
      });
  }

  render() {
    const styles = require('./CreateRoom.scss');

    return (
      <div className={`page ${styles.createRoomPage}`}>
        <div className="content box">
          <div className="form-container-2">
            <header>
              <h2>Create room</h2>
            </header>
            <CreateRoomForm onSubmit={this.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

CreateRoom.propTypes = {
  create: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  createError: PropTypes.any,
};

const mapStateToProps = function mapStateToProps(state) {
  return {
    isCreating: state.room.isCreating,
    createError: state.room.createError,
  }
};

export default connect(mapStateToProps, { create })(CreateRoom);