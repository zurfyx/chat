import express from 'express';
import passport from 'passport';

import * as authController from '~/controllers/auth';
import * as userController from '~/controllers/user';

const router = express.Router();

/**
 * Authentication.
 */
router.post('/auth/signin', authController.postSignin);
router.post('/auth/signup', authController.postSignup);
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login'}), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

/**
 * Users
 */
router.get('/users/whoami', userController.getWhoami);

/**
 * Default.
 */
router.use((err, req, res, next) => {
  if (err) {
    res.json({ error: err });
  }
});

export default router;