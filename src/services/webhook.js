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
        },
        comment: {
          id: data.comment.id,
          user: data.comment.user.login,
          body: data.comment.body,
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