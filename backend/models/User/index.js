/**
 * Copyright (c) 2014-2016 Sahat Yalkabov
 * https://github.com/sahat/hackathon-starter/blob/master/models/User.js
 */

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import mongoose, { Schema } from 'mongoose';

import { isEmail } from '~/helpers/validate';
import { isUsername, isPassword } from './validate';

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    sparse: true,
    validate: [isUsername],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail],
  },

  password: {
    type: String,
    validate: [isPassword],
  },
  passwordResetToken: String, // TODO.
  passwordResetExpires: Date, // TODO.

  github: { type: String, unique: true, sparse: true },
  google: { type: String, unique: true, sparse: true },
  tokens: [{
    _id: false,
    kind: String,
    accessToken: String,
  }],

  profile: {
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String,
  },
}, { timestamps: true });

/**
 * Triggers.
 */
// Password hashing with bcrypt.
userSchema.pre('save', function hashPassword(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  return bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }
      user.password = hash;
      return next();
    });
  });
});

/**
 * Methods.
 */
// Password validator.
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

// User's gravatar.
userSchema.methods.gravatar = function gravatar(size = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

export default User;
