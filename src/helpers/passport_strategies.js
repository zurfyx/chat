import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import config from '~/../config/auth';
import User from '~/models/User';
import { objectByString } from '~/helpers/object';

/**
 * See docs/auth-flow.svg
 */

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use('local-signin', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Invalid email or password.' });
    });
  });
}));

/**
 * Sign up using Email and Password.
 */
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true
}, (req, email, password, done) => {
  const name = req.body.name;

  User.findOne({ email }).then((user) => {
    if (user) {
      return done(null, false, { message: 'There is already an account using this email address.'})
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.profile.name = name;

    newUser.save().then((newUser) => {
      return done(null, newUser);
    }).catch((err) => {
      return done(err);
    });
  });
}));

/**
 * OAuth login.
 * mappings argument:
 * - provider: 'GitHub' (info messages)
 * - providerField: 'github' (database field & name)
 * - id: 'id' (for profile.id)
 * - name: 'displayName' (for profile.name)
 * - email: '_json.email' (for profile._json.email)
 * - gender: (GitHub doesn't provide this field)
 * - picture: '_json.avatar_url' (for profile.picture)
 * - location: 'location' (for profile.location)
 * - website: 'blog' (for profile.website)
 */
function oauth(mappings, req, accessToken, refreshToken, profile, done) {
  return req.user ? oauthSignedIn(...arguments) : oauthSignedOut(...arguments)
}

// OAuth when the user is already signed in.
function oauthSignedIn(mappings, req, accessToken, refreshToken, profile, done) {
  // Check if provider ID is linked with the current signed in account.
  if (req.user[mappings.providerField] === profile[mappings.id]) {
    // Provider ID is already linked with current signed in account. User is just trying to relink it.
    return done(null, req.user);
  }

  // Let's see who is linked to this provider ID...
  User.findOne({ [mappings.providerField]: profile.id }, (err, existingUser) => {
    if (existingUser) {
      // Provider ID already linked (on another account).
      const message = `There is already a ${mappings.provider} account that belongs to you. Sign in with that account or delete it, then link it with your current account.`;
      return done(err, false, { message });
    }

    // Provider ID not linked yet.
    User.findById(req.user.id, (err, user) => {
      if (err) { return done(err); }
      if (user[mappings.providerField]) {
        // A Provider ID has already been linked to this account
        const message = `There is already a ${mappings.provider} account linked to this account. Unlink your current ${mappings.provider} account, or create a new account.`
        return done(err, false, { message });
      }

      // Link this GitHub profile to this user account.
      return oauthLink(mappings, user, accessToken, profile, done);
    });
  });
}

// OAuth when the user is signed out.
function oauthSignedOut(mappings, req, accessToken, refreshToken, profile, done) {
  User.findOne({ [mappings.providerField]: profile.id }, (err, existingUser) => {
    if (err) { return done(err); }
    if (existingUser) {
      // Provider ID already linked. Sign in with that user.
      return done(null, existingUser);
    }

    // Provider ID not linked yet.
    User.findOne({ email: profile[mappings.email] }, (err, existingEmailUser) => {
      if (err) { return done(err); }
      if (existingEmailUser) {
        // Email was found on one of the registered accounts. Link it.
        if (existingEmailUser[mappings.providerField]) {
          // Only one provider link is supported per account.
          const message = `There is already an account using this ${mappings.provider} email address, but it has been already linked to another ${mappings.provider} account.`
          return done(err, false, { message });
        } else {
          // Link that account with the GitHub account.
          return oauthLink(mappings, existingEmailUser, accessToken, profile, done);
        }
      }

      // GitHub email was not found on any user. Let's create a new account for them!
      const user = new User();
      user.email = profile._json.email;
      // Linking does pretty much what we need to create the account (let's use this one).
      return oauthLink(mappings, user, accessToken, profile, done);
    });
  });
}

/**
 * Method to link an user account with a given OAuth profile.
 * Returns the linked account.
 */
function oauthLink(mappings, user, accessToken, profile, done) {
  user[mappings.providerField] = profile[mappings.id];
  user.tokens.push({ kind: mappings.providerField, accessToken });
  user.profile.name = user.profile.name || objectByString(profile, mappings.name);
  user.profile.picture = user.profile.picture || objectByString(profile, mappings.picture);
  user.profile.gender = user.profile.gender || objectByString(profile, mappings.gender);
  user.profile.location = user.profile.location || objectByString(profile, mappings.location);
  user.profile.website = user.profile.website || objectByString(profile, mappings.website);
  user.save((err) => {
    return done(err, user, { message : `${mappings.provider} account has been linked.` });
  });
}

/**
 * Sign in with GitHub.
 */
passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL,
  passReqToCallback: true
}, (...args) => {
  const mappings = {
    provider: 'GitHub',
    providerField: 'github',
    id: 'id',
    name: 'displayName',
    email: '_json.email',
    picture: '_json.avatar_url',
    location: '_json.location',
    website: '_json.blog',
  };
  return oauth(mappings, ...args);
}));

/**
 Sign in with Google.
 */
passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  passReqToCallback: true
}, (...args) => {
  const mappings = {
    provider: 'Google',
    providerField: 'google',
    id: 'id',
    name: 'displayName',
    email: 'emails[0].value',
    gender: '_json.gender',
    picture: '_json.image.url',
  };
  return oauth(mappings, ...args);
}));

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};