import passport from 'passport';
import validator from 'validator';

import { chain } from '~/helpers/promise';
import { ApiError } from '~/helpers/api';
import '~/helpers/passport_strategies';

// Sign in using email and password.
export function signin(req, res, next) {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  return chain
    .then(() => {
      if (!validator.isEmail(reqEmail)) {
        throw new ApiError('Invalid email');
      }
      if (validator.isEmpty(reqPassword)) {
        throw new ApiError('Password cannot be empty');
      }
    })
    .then(() => new Promise((resolve, reject) => {
      passport.authenticate('local-signin', (error, user, info) => {
        if (error) return reject(new Error(error));
        if (!user) return reject(new ApiError(info));

        return req.logIn(user, (loginError) => {
          if (loginError) return reject(new Error(loginError));
          return resolve();
        });
      })(req, res, next);
    }));
}

// Sign up using email and password.
export const signup = (req, res, next) => {
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password must be at least 4 characters long').len(4);
  req.checkBody('name', 'Name cannot be blank').notEmpty();
  req.sanitize('email');
  req.sanitize('name');

  const errors = req.validationErrors();
  if (errors) {
    return next(errors);
  }

  req.body.email = req.body.email.toLowerCase().trim();
  req.body.name = req.body.name.trim();

  passport.authenticate('local-signup', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(info);

    res.json({ message: 'OK' });
  })(req, res, next);
};

// Sign in with GitHub (callback).
export const githubCallback = (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(info);

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Redirect back to the web application.
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

// Sign in with Google (callback).
export const googleCallback = (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(info);

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Redirect back to the web application.
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

// Sign out.
export const signout = (req, res) => {
  req.logout();

  res.json({ message: 'OK' });
};