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
      body: String, // ?
    },

    comment: {
      id: Number, // 9962140
      user: String, // 'somebodyElse'
      body: String, // 'i dun know'
    }
  }

}, { timestamps: true });

webhookSchema.index({ type: 1, uid: 1 }, { unique: true });

const Webhook = mongoose.model('Webhook', webhookSchema);

export default Webhook;