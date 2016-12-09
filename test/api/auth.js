import { expect } from 'chai';

import User from '~/models/User';

export const demoUser = {
  username: 'demo',
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

//
// describe('Auth', () => {
//
// });

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

export function signin() {
  return new Promise((resolve, reject) => {
    request
      .post(`${server}/auth/signin`)
      .send({ email: 'demo@example.com', password: 'password' })
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res);
      });
  });
}

export function createAndSignin() {
  return create()
    .then(() => signin());
}

// function createAuthenticatedRequest(server, loginDetails, done) {
//   var authenticatedRequest = request.agent();
//   authenticatedRequest
//     .post(server)
//     .send(loginDetails)
//     .end(function(error, response) {
//       if (error) {
//         throw error;
//       }
//       done(authenticatedRequest)
//     });