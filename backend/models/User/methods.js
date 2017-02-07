import bcrypt from 'bcrypt';
import crypto from 'crypto';

export function comparePassword(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (error, isMatch) => (
      error ? reject(error) : resolve(isMatch)
    ));
  });
}

export function gravatar(size = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
}
