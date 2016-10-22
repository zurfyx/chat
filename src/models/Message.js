import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  content: String,

  deletedAt: Date,
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;