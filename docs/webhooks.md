# Webhooks

API webhooks available data, which depends on the event that generated it.

The intention behind custom mappings was to reduce the huge amount of data that GitHub generates,
and retrieve only the one that fits our needs.<br>
Most of the resulting mappings are just reduced versions of the [GitHub's API v3](https://developer.github.com/v3/).

## GitHub

### issue_comment

Type: `github`<br>
Event: `issue_comment`

Example output:

```
"_id": "1234abcd",
"type": "github",
"uid": "1234-abcd-1234-abcd",
"github": {
  "event": "issue_comment",
  "action": "created",
  "repository": "octocat/Hello_world",
  "issue": {
    "number": 1,
    "title": "abc",
    "user": "octocat",
    "state": "open",
    "locked": false,
    "body": "abc"
  },
  "comment": {
    "id": 1234,
    "user": "octocat-friend",
    "body": "abc"
  }
}
```

### issues

Type: `github`<br>
Event: `issues`

Example output:

```
"_id": "1234abcd",
"type": "github",
"uid": "1234-abcd-1234-abcd",
"github": {
  "event": "issues",
  "action": "opened",
  "repository": "octocat/Hello_world",
  "issue": {
    "number": 1,
    "title": "aaa",
    "user": "octocat",
    "state": "open",
    "locked": false,
    "body": "abc"
  }
}
```

### pull_request

Type: `github`<br>
Event: `pull_request`

Example output:

```
"_id": "1234abcd",
"type": "github",
"uid": "1234-abcd-1234-abcd",
"github": {
  "event": "pull_request",
  "action": "opened",
  "repository": "octocat/Hello_world",
  "pull_request": {
    "number": "1",
    "state": "open",
    "locked": false,
    "title": "Changes",
    "user": "octocat",
    "body": "A lot of changes",
    "merged": false,
    "commits": 2,
    "additions": 1000,
    "deletions": 0,
    "changed_files": 0
  }
}
```

### push

Type: `github`<br>
Event: `push`

Example output:

```
"_id": "1234abcd",
"type": "github",
"uid": "1234-abcd-1234-abcd",
"github": {
  "event": "push",
  "repository": "octocat/Hello_world",
  "commits": [
    "id": "1234abcd",
    "tree_id": "1234abcd",
    "distinct": true,
    "message": "init",
    "timestamp": "2015-05-05T19:40:15-04:00",
    "url": "https://github.com/..."
  ],
  "head_commit": {
    "id": "1234abcd",
    "tree_id": "1234abcd",
    "distinct": true,
    "message": "init",
    "timestamp": "2015-05-05T19:40:15-04:00",
    "url": "https://github.com/..."
  },
  "pusher": {
    name: "octocat",
    email: "octocat@example.com"
  }
}
```