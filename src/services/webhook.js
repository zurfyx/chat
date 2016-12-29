import Webhook from '~/models/Webhook';

export function githubWebhook(info) {
  const webhook = new Webhook();
  webhook.type = 'Github';
  
  switch (info.action) {
    case 'created': {
      webhook.github = {
        action: info.action,
        repository: info.repository.full_name,
        issue: {
          number: info.issue.number,
          title: info.issue.title,
          user: info.issue.user.login,
        },
        comment: {
          id: info.comment.id,
          user: info.comment.user.login,
          body: info.comment.body,
        },
      }
      break;
    }
    default: return; // Given action is not supported yet (exit without saving).
  }

  console.info(webhook);
  return webhook.save();
}