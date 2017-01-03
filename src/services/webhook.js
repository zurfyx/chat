import config from 'config';
import fetch from 'isomorphic-fetch';

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
    case 'pull_request': {
      webhook.github = {
        event,
        action: data.action,
        repository: data.repository.full_name,
        pull_request: {
          number: data.pull_request.number,
          state: data.pull_request.state,
          locked: data.pull_request.locked,
          title: data.pull_request.title,
          user: data.pull_request.user.login,
          body: data.pull_request.body,
          merged: data.pull_request.merged,
          commits: data.pull_request.commits,
          additions: data.pull_request.additions,
          deletions: data.pull_request.deletions,
          changed_files: data.pull_request.changed_files,
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

export function findGitHubWebhook(repository) {
  return Webhook.find({ type: 'github', 'github.repository': repository });
}

export function githubSubscribeWebhook(repository, token) {
  if (!validGithubRepository) {
    throw 'Provided GitHub repository is not valid.';
  }

  const [repositoryUser, repositoryName] = repository.split('/');
  const webhookUrl = `https://api.github.com/repos/${repositoryUser}/${repositoryName}/hooks?access_token=${token}`;
  let responseStatus;
  return fetch(webhookUrl, {
    method: 'POST',
    body: JSON.stringify({
      name: 'web',
      active: true,
      events: [
        '*',
      ],
      config: {
        url: `${config.get('host')}/webhooks/github`,
        content_type: 'json',
      },
    }),
  })
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((json) => {
      if (responseStatus !== 201
          && responseStatus !== 422
          && json.errors[0].message !== 'Hook already exsits on this repository') {
        throw json.errors ? json.errors[0].message : 'GitHub subscription failed.';
      }
    });
}

function validGithubRepository(repository) {
  // TODO: validate repository parts.
  return repository.split('/').length === 2;
}