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
