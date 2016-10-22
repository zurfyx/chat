import mongoose, { Schema } from 'mongoose';

const roomSchema = new Schema({
  title: String,
  slug: String,
  description: String,

  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Owner is required',
  },
  members: [{
    type: Schema.ObjectId,
    ref: 'User',
  }],
  online: [{
    type: Schema.ObjectId,
    ref: 'User',
  }]
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

export default Room;