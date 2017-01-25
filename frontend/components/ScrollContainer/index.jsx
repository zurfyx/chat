import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import styles from './ScrollContainer.scss';

export default class ScrollContainer extends Component {
  constructor(props) {
    super(props);

    this.forceScroll = true; // Always scroll to bottom on load.
    this.shouldScrollBottom = true;
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentWillUpdate() {
    if (this.forceScroll) {
      this.shouldScrollBottom = true;
      this.forceScroll = false;
    } else {
      const node = findDOMNode(this);
      this.shouldScrollBottom = node.scrollTop + node.clientHeight === node.scrollHeight;
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (!this.shouldScrollBottom) return;

    const node = findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
    return (
      <div className={styles.scrollContainer}>
        {this.props.children}
      </div>
    );
  }
}