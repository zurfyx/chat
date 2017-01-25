import mongoose from 'mongoose';

import User from '~/models/User';

export const basicFields = `username profile.name profile.gender 
  profile.location profile.website profile.picture`;

/**
 * Find all users.
 */
export function findUsers() {
  return User.find({}, basicFields).exec();
}

/**
 * Given a userId string identifier, finds its user object.
 */
export function findUser(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw 'User ID is invalid.';
  }

  return User.findOne({ _id: userId }, basicFields).exec().then((user) => {
    if (!user) throw 'User not found.';

    return user;
  });
}