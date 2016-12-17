import { expect } from 'chai';
import { filterPermittedKeys } from '~/helpers/validation';

describe('Validation', () => {
  describe('filterPermittedKeys', () => {
    const permitted = ['a', 'b', 'c', 'd', 'e'];
    const input = { a: 1, b: 2, z: 3, d: null };

    it ('should return an empty object if permitted is not an array', () => {
      const result = filterPermittedKeys(100, input);
      expect(result).to.eql({});
    });

    it('should return an empty object if input is not an object', () => {
      const result = filterPermittedKeys(permitted, 100);
      expect(result).to.eql({});
    });

    it('should remove non-permitted fields', () => {
      const result = filterPermittedKeys(permitted, input);
      expect(result).to.eql({ a: 1, b: 2, d: null });
    });
  });
});