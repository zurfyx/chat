/* eslint-disable no-unused-expressions */

import { expect } from 'chai';

import * as validate from '../validate';

describe('Validate', () => {
  describe('isEmail', () => {
    it('should be true on valid email', () => {
      expect(validate.isEmail('nyao@example.com')).to.be.true;
    });

    it('should be false on invalid email', () => {
      expect(validate.isEmail('hohoho')).to.be.false;
    });
  });

  describe('isId', () => {
    it('should be false on invalid MongoDB id', () => {
      expect(validate.isId('1111')).to.be.false;
    });

    it('should be true on valid MongoDB id', () => {
      expect(validate.isId('589a17bc5ddce86fd206ad18')).to.be.true;
    });
  });
});
