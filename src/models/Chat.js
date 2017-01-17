import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema({
  room: {
    type: Schema.ObjectId,
    ref: 'Room',
    required: 'Room is required',
  },

  parent: {
    type: Schema.ObjectId,
    ref: 'Chat',
  },

  title: String,
  description: String,

  github: String,

  firstMessageDate: Date,
  lastMessageDate: Date,

  sticky: {
    type: Schema.ObjectId,
    ref: 'Message',
  },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;