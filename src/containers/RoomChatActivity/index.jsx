import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { retrieveGithub } from 'redux/modules/webhook';
import Activity from 'components/Activity';

import styles from './RoomChatActivity.scss';

export class RoomChatActivity extends Component {
  
  componentWillMount() {
    // Subscribe to GitHub activities
    if (this.props.chat.github) {
      console.error('Github chat');
      // TODO: activity updates through socket.
      this.props.retrieveGithub(this.props.chat.github);
      this.activityInterval = window.setInterval(() => {
        this.props.retrieveGithub(this.props.chat.github);
      }, 30000);
    }
  }

  componentWillUnmount() {
    if (this.activityInterval) {
      window.clearInterval(this.activityInterval);
    }
  }

  render() {
    const activities = this.props.chat.github && this.props.webhookActivities || [];

    return (
      <div className={styles.activityPage}>
        <h4>Activity</h4>
        {activities.map((activity) =>
          <Activity key={`activity-${activity._id}`} entry={activity} />
        )}
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return {
    chat: state.chat.activateResult,

    webhookActivities: state.webhook.retrieveResult,
  }
};

export default connect(mapStateToProps, { retrieveGithub })(RoomChatActivity);