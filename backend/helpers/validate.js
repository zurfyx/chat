/**
 * Global validators go here.
 * Local validator (which are only used once) are stored next to the component.
 * I.e. isUsername in ~/models/User/validate.js
 *
 * Input: value: any.
 * Output: Boolean
 *
 * Prefer validating with validator over your own code.
 */

import validator from 'validator';
import mongoose from 'mongoose';

export const isEmail = value => validator.isEmail(value);

export function isId(value) {
  return mongoose.Types.ObjectId.isValid(value);
}
