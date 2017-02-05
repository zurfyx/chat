/**
 * Global validators go here.
 * Local validator (which are only used once) are stored next to the component.
 * I.e. isUsername in ~/models/User/validate.js
 *
 * Format: Mongoose http://mongoosejs.com/docs/validation.html
 * Input: value:any.
 * Output: [assertion:Boolean, errorMessage:string]
 *
 * Prefer validating with validator when possible.
 */

import validator from 'validator';
import mongoose from 'mongoose';

export const isEmail = val => [validator.isEmail(val), 'Invalid email.'];

export function isId(value) {
  return [mongoose.Types.ObjectId.isValid(value), 'Invalid ID.'];
}
