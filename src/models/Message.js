import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  chat: {
    type: Schema.ObjectId,
    ref: 'Chat',
    required: 'Chat is required',
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
  },

  // contentType defines the sort of content that this message will contain, to
  // identify the stored content:
  // plain: standard text.
  // language: a programming language (define language).
  contentType: {
    type: String,
    enum: ['plain', 'language'],
    required: 'Message type is required',

    language: { String, enum: ['markdown', 'html', 'javascript', 'css'] },
  },

  content: String,

  deletedAt: Date,
}, { timestamps: true });

messageSchema.index({ createdAt: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;