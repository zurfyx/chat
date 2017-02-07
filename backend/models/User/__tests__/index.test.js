/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';

import User from '../';

describe('Model: User', () => {
  it('should be invalid if email is empty', async () => {
    const user = new User();
    try {
      await user.validate();
    } catch (error) {
      expect(error.errors.email).to.exist;
    }
  });

  it('should create an User object', async () => {
    const UserMock = sinon.mock(new User({ email: 'nyao@example.com' }));
    const user = UserMock.object;

    UserMock.expects('save');

    try {
      await user.save();
      UserMock.verify();
      UserMock.restore();
    } catch (error) {
      throw new Error('Unexpected error creating User.');
    }
  });
});
