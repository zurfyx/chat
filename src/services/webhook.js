import Webhook from '~/models/Webhook';

/**
 * Webhooks will be stored only if they weren't stored before, by checking the unique type <-> uid
 * pair.
 * No error is returned if duplicate is found.
 * If the event is not supported, no entry will be created but no error will be returned either.
 */

export function githubWebhook(event, uid, data) {
  const webhook = new Webhook();
  webhook.type = 'github';
  webhook.uid = uid;

  switch (event) {
    case 'issue_comment': {
      webhook.github = {
        event,
        action: data.action,
        repository: data.repository.full_name,
        issue: {
          number: data.issue.number,
          title: data.issue.title,
          user: data.issue.user.login,
          state: data.issue.state,
          locked: data.issue.locked,
          body: data.issue.body,
        },
        comment: {
          id: data.comment.id,
          user: data.comment.user.login,
          body: data.comment.body,
        },
      };
      break;
    }
    case 'issues': {
      webhook.github = {
        event,
        action: data.action,
        repository: data.repository.full_name,
        issue: {
          number: data.issue.number,
          title: data.issue.title,
          user: data.issue.user,
          state: data.issue.state,
          locked: data.issue.locked,
          body: data.issue.body,
        },
      };
      break;
    }
    case 'push': {
      webhook.github = {
        event,
        repository: data.repository.full_name,
        commits: data.commits.map(commit => ({
          id: commit.id,
          tree_id: commit.tree_id,
          distinct: commit.distinct,
          message: commit.message,
          timestamp: commit.timestamp,
          url: commit.url,
        })),
        head_commit: {
          id: data.head_commit.id,
          tree_id: data.head_commit.tree_id,
          distinct: data.head_commit.distinct,
          message: data.head_commit.message,
          timestamp: data.head_commit.timestamp,
          url: data.head_commit.url,
        },
        pusher: {
          name: data.pusher.name,
          email: data.pusher.email,
        },
      };
      break;
    }
    default: return; // Given action is not supported yet (exit without saving).
  }

  return Webhook.update(
    { type: 'github', uid },
    { $setOnInsert: webhook },
    { upsert: true },
  );
}