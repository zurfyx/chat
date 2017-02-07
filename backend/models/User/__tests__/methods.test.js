/* eslint-disable no-unused-expressions */

import { expect } from 'chai';

import User from '../';

describe('Model: User (methods)', () => {
  it('hashed password should match when compared with the original password', async () => {
    const user = new User({
      password: '$2a$10$xajS.IBbnTvkW8Iy44tCm.8Py7BiJ9OKRBvO8FJ5vkrlSbzXjRXM.',
    });

    try {
      const isMatch = await user.comparePassword.call(user, '1234');
      expect(isMatch).to.be.true;
    } catch (error) {
      throw new Error(`Unexpected error comparing password: ${error}`);
    }
  });

  it('hashed password shouldn\'t match when compared with another password', async () => {
    const user = new User({
      password: '$2a$10$xajS.IBbnTvkW8Iy44tCm.8Py7BiJ9OKRBvO8FJ5vkrlSbzXjRXM.',
    });

    try {
      const isMatch = await user.comparePassword.call(user, '42');
      expect(isMatch).to.be.false;
    } catch (error) {
      throw new Error('Unexpected error comparing password.');
    }
  });
});
