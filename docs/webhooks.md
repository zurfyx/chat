# Webhooks

API webhooks available data, which depends on the event that generated it.

## GitHub

### commit_comment

Type: `github`<br>
Event: `commit_comment`

Example output:

```
"_id": "1234abcd",
"type": "github",
"uid": "1234-abcd-1234-abcd",
"github": {
  "event": "commit_comment",
  "action": "created",
  "repository": "octocat/Hello_world",
  "issue": {
    "number": 1,
    "title": "aaa",
    "user": "octocat"
  },
  "comment": {
    "id": 1234,
    "user": "octocat-friend",
    "body": "bbb"
  }
}
```