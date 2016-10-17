import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,

  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Owner is required',
  },
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }],

  chats: Array,
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;