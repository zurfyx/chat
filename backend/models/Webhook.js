import mongoose, { Schema } from 'mongoose';

const webhookSchema = new Schema({
  type: {
    type: String,
    required: 'Type is required',
    enum: ['github'],
  }, // github
  uid: { type: String, required: 'Unique identifier is required' }, // 8a39eb00

  github: {
    event: String, // 'issue_comment'
    action: String, // 'created'
    repository: String, // 'user/repository'

    issue: {
      number: Number, // 2
      title: String, // 'how to create a webhook'
      user: String, // 'somebody'
      state: String, // 'open'
      locked: Boolean, // false
      body: String, // 'body'
    },

    comment: {
      id: Number, // 9962140
      user: String, // 'somebodyElse'
      body: String, // 'i dun know'
    },

    pull_request: {
      number: Number,
      state: String, // 'open'
      locked: Boolean,
      title: String,
      user: String, // 'octocat'
      body: String,
      merged: Boolean,
      commits: Number,
      additions: Number,
      deletions: Number,
      changed_files: Number,
    },

    commits: [{
      id: String,
      tree_id: String,
      distinct: Boolean,
      message: String,
      timestamp: Date, // 2015-05-05T19:40:15-04:00
      url: String,
    }],

    head_commit: {
      id: String,
      tree_id: String,
      distinct: Boolean,
      message: String,
      timestamp: Date, // 2015-05-05T19:40:15-04:00
      url: String,
    },

    pusher: {
      name: String, // 'somebody',
      email: String, // 'somebody@example.com
    },
  },
}, { timestamps: true });

webhookSchema.index({ type: 1, uid: 1 }, { unique: true });

const Webhook = mongoose.model('Webhook', webhookSchema);

export default Webhook;