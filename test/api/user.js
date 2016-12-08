import { expect, request } from 'chai';

import User from '~/models/User';

describe('User', () => {
  beforeEach(() => {
    User.remove({}).exec().then(() => {
      done();
    });
  });

  describe('GET /users/whoami', () => {
    it ('should be empty when no-one is logged in', (done) => {
      request(server)
        .get('/users/whoami')
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.eql({ error: 'Not signed in' });
          done();
        });
    });
  })
});