import { expect } from 'chai';

import User from '~/models/User';
import { createAndSignin, demoUser } from './auth';

describe('User', () => {
  beforeEach((done) => {
    User.remove({}).then(() => done());
  });

  describe('GET /users/whoami', () => {
    it('should return signed in user', (done) => {
      createAndSignin().then(() => {
        request
          .get(`${server}/users/whoami`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.username).to.equal(demoUser.username);
            expect(res.body.profile.name).to.equal(demoUser.profile.name);
            expect(res.body.profile.gender).to.equal(demoUser.profile.gender);
            expect(res.body.profile.location).to.equal(demoUser.profile.location);
            expect(res.body.profile.website).to.equal(demoUser.profile.website);
            expect(res.body.profile.picture).to.equal(demoUser.profile.picture);

            expect(res.body).not.to.have.property('email');
            expect(res.body).not.to.have.property('password');
            expect(res.body).not.to.have.property('passwordResetToken');
            expect(res.body).not.to.have.property('passwordResetExpires');
            expect(res.body).not.to.have.property('github');
            expect(res.body).not.to.have.property('google');
            expect(res.body).not.to.have.property('tokens');

            done();
          });
      });
    });

    it('should be empty when no-one is signed in', (done) => {
      request
        .get(`${server}/users/whoami`)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body).to.eql({ error: 'Not signed in' });
          done();
        });
    });

  });
});