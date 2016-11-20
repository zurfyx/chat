import mongoose from 'mongoose';

import User from '~/models/User';

/**
 * Given a userId string identifier, finds its user object.
 */
export function findUser(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw 'No user matched the given userId.';
  }

  return User.findOne({ _id: userId }).exec().then((user) => {
    if (!user) throw 'User not found.';

    return user;
  });
}