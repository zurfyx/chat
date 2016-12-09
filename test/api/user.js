import { expect } from 'chai';

import User from '~/models/User';
import { create, createAndSignin, demoUser } from './auth';

// Check an user against the basic fields.
function expectDemoUserBasicFields(user) {
  expect(user).to.be.an('object');
  expect(user).to.have.property('_id');
  expect(user.username).to.equal(demoUser.username);
  expect(user.profile.name).to.equal(demoUser.profile.name);
  expect(user.profile.gender).to.equal(demoUser.profile.gender);
  expect(user.profile.location).to.equal(demoUser.profile.location);
  expect(user.profile.website).to.equal(demoUser.profile.website);
  expect(user.profile.picture).to.equal(demoUser.profile.picture);

  expect(user).not.to.have.property('email');
  expect(user).not.to.have.property('password');
  expect(user).not.to.have.property('passwordResetToken');
  expect(user).not.to.have.property('passwordResetExpires');
  expect(user).not.to.have.property('github');
  expect(user).not.to.have.property('google');
  expect(user).not.to.have.property('tokens');
}

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
            expectDemoUserBasicFields(res.body);
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

  describe('GET /users', () => {
    it('should return a list of all users', (done) => {
      create().then(() => {
        request
          .get(`${server}/users`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(1);
            expectDemoUserBasicFields(res.body[0]);
            done();
          });
      });
    });
  });

  describe('GET /users/:id', () => {
    it('should return an error when the ID is invalid', (done) => {
      create().then(() => {
        request
          .get(`${server}/users/invalid`)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            expect(res.body).to.eql({ error: 'User ID is invalid.'});
            done();
          });
      });
    });

    it('should return an error when the user is not found', (done) => {
      create().then((user) => {
        // Generate a random valid id, but which will not exists.
        // Based on a valid id, which is the one just created user.
        const userId = String(user._id);
        const id404 = `${userId.slice(1)}${userId[0]}`;
        request
          .get(`${server}/users/${id404}`)
          .end((err, res) => {
            expect(res.status).to.equal(500);
            expect(res.body).to.eql({ error: 'User not found.' });
            done();
          });
      });
    });

    it('should return an user when the user ID is found', (done) => {
      create().then((user) => {
        request
          .get(`${server}/users/${user._id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expectDemoUserBasicFields(res.body);
            done();
          });
      });
    });
  });

});