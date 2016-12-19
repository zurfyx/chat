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
    required: 'Owner is required',
  },

  content: String,
  // type defines the sort of content that this message will contain, to
  // identify the stored content:
  // plain: standard text.
  // code: a programming snippet.
  type: {
    type: String,
    enum: ['plain', 'code'],
    required: 'Type is required',
  },
  specifics: {
    // Use with 'code'.
    language: { type: String, enum: ['plain', 'markdown', 'html', 'javascript', 'css'] },
    highlight: { type: String },
  },

  deletedAt: Date,
}, { timestamps: true });

messageSchema.index({ createdAt: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;