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

  content: String,

  deletedAt: Date,
}, { timestamps: true });

messageSchema.index({ createdAt: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;