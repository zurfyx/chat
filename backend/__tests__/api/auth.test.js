import { expect } from 'chai';

import { chain } from '~/helpers/promise';
import User from '~/models/User';

export const demoUser = {
  username: 'demouser',
  email: 'demo@example.com',
  password: 'password',
  profile: {
    name: 'Demo',
    gender: 'bot',
    location: 'node',
    website: 'www',
    picture: 'png',
  },
};


describe('Auth', () => {
  describe('POST /auth/signin', () => {
    beforeEach((done) => {
      // Create a sample User to work with.
      chain
        .then(() => create())
        .then(() => done());
    });

    it('should not log in with wrong credentials', (done) => {
      chain
        .then(() => signin('404@example.com'))
        .catch(() => {
          request
            .get(`${server}/users/whoami`)
            .end((err, res) => {
              expect(res.status).not.to.equal(200);
              done();
            });
        });
    });

    it('should log in with the right credentials', (done) => {
      chain
        .then(() => signin())
        .then(() => {
          request
            .get(`${server}/users/whoami`)
            .end((err, res) => {
              expect(res.status).to.equal(200);
              done();
            });
        });
    });
  });
});

export function create() {
  const user = new User(demoUser);
  user.username = demoUser.username;
  user.email = demoUser.email;
  user.password = demoUser.password;
  user.profile.name = demoUser.profile.name;
  user.profile.gender = demoUser.profile.gender;
  user.profile.location = demoUser.profile.location;
  user.profile.website = demoUser.profile.website;
  user.profile.picture = demoUser.profile.picture;
  return user.save();
}

export function signin(email = 'demo@example.com', password = 'password') {
  return new Promise((resolve, reject) => {
    request
      .post(`${server}/auth/signin`)
      .send({ email, password })
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
}

export function createAndSignin() {
  let user;
  return chain
    .then(() => create())
    .then((createdUser) => user = createdUser)
    .then(() => signin())
    .then(() => user);
}