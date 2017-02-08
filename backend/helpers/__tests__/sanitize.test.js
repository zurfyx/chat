import { expect } from 'chai';

import * as sanitize from '../sanitize';

describe('Sanitize', () => {
  describe('filterPermittedKeys', () => {
    const permitted = ['a', 'b', 'c', 'd', 'e'];
    const input = { a: 1, b: 2, z: 3, d: null };

    it('should return an empty object if permitted is not an array', () => {
      const result = sanitize.filterPermittedKeys(100, input);
      expect(result).to.eql({});
    });

    it('should return an empty object if input is not an object', () => {
      const result = sanitize.filterPermittedKeys(permitted, 100);
      expect(result).to.eql({});
    });

    it('should remove non-permitted fields', () => {
      const result = sanitize.filterPermittedKeys(permitted, input);
      expect(result).to.eql({ a: 1, b: 2, d: null });
    });
  });
});
