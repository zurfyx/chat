/**
 * Copyright (c) 2014-2016 Sahat Yalkabov
 * https://github.com/sahat/hackathon-starter/blob/master/models/User.js
 */

import mongoose, { Schema } from 'mongoose';

import { isEmail } from '~/helpers/validate';
import { isUsername, isPassword } from './validate';
import { hashPassword } from './middleware';
import { comparePassword, gravatar } from './methods';

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    validate: [{ validator: isUsername, msg: 'Username must consist of only alphanumeric values with a length between 5 and 20 characters.' }],
  },

  email: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    validate: [{ validator: isEmail, msg: 'Invalid email.' }],
  },

  password: {
    type: String,
    validate: [{ validator: isPassword, msg: 'Password must have a minimum of 4 characters.' }],
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
 * Middleware.
 */
userSchema.pre('save', hashPassword);

/**
 * Methods.
 */
userSchema.methods.comparePassword = comparePassword;
userSchema.methods.gravatar = gravatar;

const User = mongoose.model('User', userSchema);

export default User;
