/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';
import mockery from 'mockery';

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

  it('should call email validator', async () => {
    const isEmailStub = sinon.stub();
    isEmailStub.withArgs('nyao@example.com').returns([true]);

    mockery.enable({ warnOnReplace: false, warnOnUnregistered: false });
    mockery.registerAllowable('../');
    mockery.registerMock('../../helpers/validate', { isEmail: isEmailStub });

    const UserMock = require('../').default; // eslint-disable-line global-require
    const user = new UserMock({ email: 'nyao@example.com' });

    await user.validate();
    expect(isEmailStub).to.be.calledOnce;

    mockery.deregisterAll();
    mockery.disable();
  });

  // http://stackoverflow.com/a/42116795
  it('should throw error on invalid email', async () => {
    const user = new User({ email: 'invalid email' });

    try {
      await user.validate();
      throw Error('Email was not valid, expected exception');
    } catch (error) {
      expect(error.errors.email).to.exist;
    }
  });

  it('should not throw error on valid email', async () => {
    const user = new User({ email: 'nyao@example.com' });

    const validate = await user.validate();
    expect(validate).not.to.exist;
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
