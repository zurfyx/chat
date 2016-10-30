import express from 'express';
import passport from 'passport';

import { isAuthenticated } from '~/middleware/auth';
import { isUserIdValid } from '~/middleware/user';
import { isRoomIdValid, isRoomOwner } from '~/middleware/room';
import { isChatIdValid } from '~/middleware/chat';
import { isMessageIdValid, isMessageOwner } from '~/middleware/message';

import * as authController from '~/controllers/auth';
import * as userController from '~/controllers/user';
import * as roomController from '~/controllers/room';
import * as chatController from '~/controllers/chat';
import * as messageController from '~/controllers/message';

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

// User -> Room.
router.get('/users/:_id/rooms/joined', isUserIdValid, roomController.joinedRooms);
router.get('/users/:_id/rooms/owned', isUserIdValid, roomController.ownedRooms);

/**
 * Rooms
 */
router.get('/rooms', roomController.rooms);
router.post('/rooms', isAuthenticated, roomController.createRoom);
router.get('/rooms/search', roomController.searchRooms);
router.get('/rooms/:_id', isRoomIdValid, roomController.getRoom);
router.put('/rooms/:_id', isAuthenticated, isRoomIdValid, isRoomOwner, roomController.editRoom);
router.post('/rooms/:_id/join', isAuthenticated, isRoomIdValid, roomController.joinRoom);
router.post('/rooms/:_id/leave', isAuthenticated, isRoomIdValid, roomController.leaveRoom);
router.delete('/rooms/:_id', isAuthenticated, isRoomIdValid, isRoomOwner, roomController.deleteRoom);

// Room -> Chat.
router.get('/rooms/:_id/chats', isRoomIdValid, chatController.chats);
router.post('/rooms/:_id/chats', isAuthenticated, isRoomIdValid, isRoomOwner, chatController.createChat);

/**
 * Chats
 */
router.get('/chats/:_id', isAuthenticated, isChatIdValid, chatController.getChat);
router.delete('/chats/:_id', isAuthenticated, isChatIdValid, chatController.deleteChat);
router.post('/chats/:_id/fork', isAuthenticated, isChatIdValid, chatController.forkChat);
router.post('/chats/:_id/fork-merge', isAuthenticated, isChatIdValid, chatController.forkMerge); // Merge fork with the original chat. (?)
router.post('/chats/:_id/fork-upgrade', isAuthenticated, isChatIdValid, chatController.forkUpgrade); // Fork to chat.

// Chat -> Message.
router.get('/chats/:_id/messages', isChatIdValid, messageController.messages);
router.post('/chats/:_id/messages', isAuthenticated, isChatIdValid, messageController.createMessage);

/**
 * Messages
 */
router.put('/messages/:_id', isAuthenticated, isMessageIdValid, isMessageOwner, messageController.editMessage);
router.delete('/messages/:_id', isAuthenticated, isMessageIdValid, isMessageOwner, messageController.deleteMessage);

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