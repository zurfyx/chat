import express from 'express';
import passport from 'passport';

import { isAuthenticated } from '~/middleware/auth';
import { isRoomSlugValid } from '~/middleware/room';

import * as authController from '~/controllers/auth';
import * as userController from '~/controllers/user';
import * as roomController from '~/controllers/room';

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
router.get('/users/whoami', isAuthenticated, userController.whoami);
// router.get('/users/me/joined-rooms', authController, roomController.joinedRooms);
// router.get('/users/me/owned-rooms', authController, roomController.ownedRooms);

/**
 * Rooms
 */
router.get('/rooms', roomController.rooms);
router.post('/rooms', isAuthenticated, roomController.createRoom);
router.get('/rooms/:slug', isRoomSlugValid, roomController.getRoom);
router.post('/rooms/:slug/join', isAuthenticated, isRoomSlugValid, roomController.joinRoom);
router.post('/rooms/:slug/leave', isAuthenticated, isRoomSlugValid, roomController.leaveRoom);
// router.delete('/rooms/:slug', isAuthenticated, isRoomSlugValid, roomController.deleteRoom);

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