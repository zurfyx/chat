import passport from 'passport';

import '~/helpers/passport_strategies';

// Sign in using email and password.
export const postSignin = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail();

  const errors = req.validationErrors();

  if (errors) {
    return next(errors);
  }

  passport.authenticate('local-signin', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(info.message);

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json({ msg: 'OK' });
    });
  })(req, res, next);
};

// Sign up using email and password.
export const postSignup = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail();

  const errors = req.validationErrors();

  if (errors) {
    return next(errors);
  }

  passport.authenticate('local-signup', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(info.message);

    res.json({ msg: 'OK' });
  })(req, res, next);
};