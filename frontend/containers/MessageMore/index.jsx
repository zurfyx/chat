import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import CreateSnippet from 'containers/CreateSnippet';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    borderRadius: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
  }
};

export class MessageMore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snippetModal: false,
    };

    this.handlePicture = this.handlePicture.bind(this);
    this.toggleSnippetModal = this.toggleSnippetModal.bind(this);
  }

  handlePicture() {
    alert('Coming soon...');
  }

  toggleSnippetModal() {
    this.setState({ snippetModal: !this.state.snippetModal });
  }

  render() {
    const styles = require('./MessageMore.scss');

    return (
      <div className={styles.messageMore}>
        <Modal
          isOpen={this.state.snippetModal}
          onRequestClose={this.toggleSnippetModal}
          style={modalStyles}
        >
          <CreateSnippet complete={this.toggleSnippetModal} />
        </Modal>
        <div className={`vertical-fold ${styles.foldContainer}`}>
          <ul>
            <li>
              <a className="no-decorate" onClick={this.handlePicture}>
                <i className="fa fa-picture-o" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a className="no-decorate" onClick={this.toggleSnippetModal}>
                <i className="fa fa-code" aria-hidden="true"></i>
              </a>
            </li>
          </ul>

          <a href="#" className={styles.moreButton}>
            <i className="fa fa-plus"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default connect()(MessageMore);