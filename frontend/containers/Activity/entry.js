import Redux from 'redux';
import fetch from 'isomorphic-fetch';

export default function processEntry(entry) {

  if (entry.github) {
    return processGithubEntry();
  } else {
    return {};
  }

  function processGithubEntry() {
    const github = entry.github;
    switch (github.event) {
      case 'issue_comment': {
        return {
          icon: 'fa-comment',
          user: github.issue.user,
          timestamp: entry.createdAt,
          action: github.action,
          target: github.issue.number,
        };
      }
      case 'issues': {
        return {
          icon: 'fa-exclamation-triangle',
          user: github.issue.user,
          timestamp: entry.createdAt,
          action: github.action,
          target: github.issue.number,
        };
      }
      case 'pull_request': {
        return {
          icon: 'fa-code-fork',
          user: github.pull_request.user,
          timestamp: entry.createdAt,
          action: github.action,
          target: github.pull_request.number,
          more: {
            fork: () => {
              const url = `https://api.github.com/repos/${github.repository}/pulls/${github.pull_request.number}`;
              return fetch(url)
                .then(data => data.json())
                .then(data => {
                  const body = data.body || '*(no description)*';
                  const conversation = `[Conversation](https://github.com/${github.repository}/pull/${github.pull_request.number})`;
                  const commits = `[Commits](https://github.com/${github.repository}/pull/${github.pull_request.number}/commits)`;
                  const filesChanged = `[Files changed](https://github.com/${github.repository}/pull/${github.pull_request.number}/files)`;
                  return {
                    title: data.title,
                    content: `${body}\n\n${conversation} ${commits} ${filesChanged}`,
                    type: 'plain',
                  };
                });
            }
          },
        };
      }
      case 'push': {
        return {
          icon: 'fa-arrow-up',
          user: github.pusher.name,
          timestamp: entry.createdAt,
          action: 'pushed',
          target: github.head_commit.id,
        };
      }
      default: {
        return {};
      }
    }
  }

}