import Redux from 'redux';

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
            fork: { title: '123', content: 'content', type: 'plain' },
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

