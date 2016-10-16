import passport from 'passport';

import '~/helpers/passport_strategies';

// Sign in using email and password.
export const signin = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail();

  const errors = req.validationErrors();

  if (errors) {
    return next(errors);
  }

  passport.authenticate('local-signin', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(info);

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json({ msg: 'OK' });
    });
  })(req, res, next);
};

// Sign up using email and password.
export const signup = (req, res, next) => {
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
    if (!user) return next(info);

    res.json({ msg: 'OK' });
  })(req, res, next);
};

// Sign in with GitHub (callback).
export const githubCallback = (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    if (err) return next(err);
    if (!user) return next(info);

    // Redirect back to the web application.
    res.redirect(req.session.returnTo || '/');
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

  req.logIn(user, (err) => {
    if (err) return next(err);

    // Redirect back to the web application.
    res.redirect(req.session.returnTo || '/');
  });
};