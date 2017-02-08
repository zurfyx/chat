/* eslint-disable no-unused-expressions */

import { expect } from 'chai';

import { isUsername, isPassword } from '../validate';

describe('Model: User (validate)', () => {
  it('should be invalid if username length is not between 5-20', async () => {
    expect(isUsername('x')).to.be.false;
    expect(isUsername('x'.repeat(21))).to.be.false;
    expect(isUsername('x'.repeat(5))).to.be.true;
  });

  it('should be invalid if username contains non-alphanumeric characters', async () => {
    expect(isUsername('⚡')).to.be.false;
    expect(isUsername('hel-lo')).to.be.false;
    expect(isUsername('hello')).to.be.true;
  });

  it('should be invalid if password length is less than 4 characters', () => {
    expect(isPassword('x')).to.be.false;
    expect(isPassword('x'.repeat(4))).to.be.true;
  });
});
