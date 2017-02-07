/* eslint-disable no-unused-expressions */

import { expect } from 'chai';

import { isUsername, isPassword } from '../validate';

describe('Model: User (validate)', () => {
  it('should be invalid if username length is not between 5-20', async () => {
    expect(isUsername('x')[0]).to.be.false;
    expect(isUsername('x'.repeat(21))[0]).to.be.false;
    expect(isUsername('x'.repeat(5))[0]).to.be.true;
  });

  it('should be invalid if username contains non-alphanumeric characters', async () => {
    expect(isUsername('⚡')[0]).to.be.false;
    expect(isUsername('hel-lo')[0]).to.be.false;
    expect(isUsername('hello')[0]).to.be.true;
  });

  it('should be invalid if password length is less than 4 characters', () => {
    expect(isPassword('x')[0]).to.be.false;
    expect(isPassword('x'.repeat(4))[0]).to.be.true;
  });
});
