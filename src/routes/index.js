import express from 'express';
import passport from 'passport';

import { isAuthenticated } from '~/middleware/auth';
import { isUserIdValid } from '~/middleware/user';
import { isRoomIdValid, isRoomOwner } from '~/middleware/room';
import { isChatIdValid } from '~/middleware/chat';
import { isMessageIdValid, isMessageOwner } from '~/middleware/message';

import * as auth from '~/controllers/auth';
import * as user from '~/controllers/user';
import * as room from '~/controllers/room';
import * as chat from '~/controllers/chat';
import * as message from '~/controllers/message';
import * as webhook from '~/controllers/webhook';

const router = express.Router();

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => (req, res, next) => {
  const boundParams = params ? params(req) : [];
  return promise(...boundParams)
    .then((result) => res.json(result))
    .catch((error) => res.status(500) && next(error)
    );
};
const c = controllerHandler; // Just a name shortener.

/**
 * Authentication.
 * There is no need to use any of these nor their controller's logic
 * with sockets, so we'll leave them with the old (req, res, next) controllers
 * for the time being.
 */
router.post('/auth/signin', auth.signin);
router.post('/auth/signup', auth.signup);
router.get('/auth/github', passport.authenticate('github', { scope: 'user:email' }));
router.get('/auth/github/repo', passport.authenticate('github', { scope: 'user:email write:repo_hook' }));
router.get('/auth/github/callback', auth.githubCallback);
router.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/auth/google/callback', auth.googleCallback);
router.get('/auth/signout', auth.signout);

/**
 * Users
 */
router.get('/users', c(user.users));
router.get('/users/whoami', c(user.whoami, (req) => [req.user]));
router.get('/users/:_id', c(user.find, (req) => [req.params._id]));

// User -> Room.
router.get('/users/:_id/rooms/joined', c(room.findJoinedByUser, (req) => [req.params._id]));
router.get('/users/:_id/rooms/owned', c(room.findOwnerByUser, (req) => [req.params._id]));

/**
 * Rooms
 */
router.get('/rooms', room.rooms);
router.post('/rooms', isAuthenticated, room.createRoom);
router.get('/rooms/search', room.searchRooms);
router.get('/rooms/:_id', isRoomIdValid, room.getRoom);
router.put('/rooms/:_id', isAuthenticated, isRoomIdValid, isRoomOwner, room.editRoom);
router.post('/rooms/:_id/join', isAuthenticated, isRoomIdValid, room.joinRoom);
router.post('/rooms/:_id/leave', isAuthenticated, isRoomIdValid, room.leaveRoom);
router.delete('/rooms/:_id', isAuthenticated, isRoomIdValid, isRoomOwner, room.deleteRoom);

// Room -> Chat.
router.get('/rooms/:_id/chats', isRoomIdValid, chat.chats);
router.post('/rooms/:_id/chats', isAuthenticated, isRoomIdValid, isRoomOwner, chat.createChat);

/**
 * Chats
 */
router.get('/chats/:_id', isChatIdValid, chat.getChat);
router.patch('/chats/:_id', c(chat.edit, (req) => [req.user, req.params._id, req.body]));
router.delete('/chats/:_id', isAuthenticated, isChatIdValid, chat.deleteChat);
router.post('/chats/:_id/fork', isAuthenticated, isChatIdValid, chat.forkChat);
router.post('/chats/:_id/fork-merge', isAuthenticated, isChatIdValid, chat.forkMerge); // Merge fork with the original chat. (?)
router.post('/chats/:_id/fork-upgrade', isAuthenticated, isChatIdValid, chat.forkUpgrade); // Fork to chat.

// Chat -> Message.
router.get('/chats/:_id/messages', isChatIdValid, message.messages);
router.post('/chats/:_id/messages', c(message.create, (req) => [req.user, req.params._id, req.body]));

/**
 * Messages
 */
router.put('/messages/:_id', isAuthenticated, isMessageIdValid, isMessageOwner, message.editMessage);
router.delete('/messages/:_id', isAuthenticated, isMessageIdValid, isMessageOwner, message.deleteMessage);

/**
 * Webhooks
 */
router.post('/webhooks/github', c(webhook.github, (req) => [req.get('X-GitHub-Event'), req.get('X-GitHub-Delivery'), req.ip, req.body]));

/**
 * Default.
 * Authentication errors & de will end up here.
 */
router.use((err, req, res, next) => {
  res.status(err.status || 500);

  if (!err.status) {
    console.error('~~~ UNEXPECTED ERROR ~~~');
    console.error(err);
    err.stack && console.error(err.stack);
    console.error('~~~~~~~~~~~~~~~~~~~~~~~~~');
  }

  return res.json({ error: err });
});

export default router;