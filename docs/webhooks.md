# Webhooks

API webhooks available data, which depends on the event that generated it.

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
  "event": {
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
}
```