import express from 'express';
import passport from 'passport';

import * as authController from '~/controllers/auth';
import * as userController from '~/controllers/user';

const router = express.Router();

/**
 * Authentication.
 */
router.post('/auth/signin', authController.signin);
router.post('/auth/signup', authController.signup);
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', authController.githubCallback);
router.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/auth/google/callback', authController.googleCallback);
router.get('/auth/signout', authController.signout);

/**
 * Users
 */
router.get('/users/whoami', userController.whoami);

/**
 * Default.
 */
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  if (err) {
    res.json({ error: err });
  }
});

export default router;