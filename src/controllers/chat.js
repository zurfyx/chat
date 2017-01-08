import { chain } from '~/helpers/promise';
import Chat from '~/models/Chat';
import { isAuthenticated } from '~/services/auth';
import { findChat, editChat, emitChat } from '~/services/chat';

export const chats = (req, res, next) => {
  const room = req.room;

  Chat.find({ room }, (err, chats) => {
    if (err) next(err);

    return res.json(chats);
  });
};

export const createChat = (req, res, next) => {
  const room = req.room;

  req.checkBody('title', 'Title cannot be blank').notEmpty();
  req.sanitize('title').trim();
  req.sanitize('description').trim();
  req.sanitize('github').trim();

  const errors = req.validationErrors();
  if (errors) {
    return next(errors);
  }

  const newChat = new Chat();
  newChat.room = room;
  newChat.title = req.body.title;
  newChat.description = req.body.description;
  newChat.github = req.body.github;

  newChat.save((err, chat) => {
    if (err) return next(err);

    return res.json(chat);
  });
};

export const edit = (currentUser, chatId, chatValues) => {
  return chain
    .then(() => isAuthenticated(currentUser))
    .then(() => findChat(chatId))
    .then(() => editChat(chatId, chatValues))
    .then((chat) => emitChat(chat.room, chat));
};

export const getChat = (req, res, next) => {
  const chat = req.chat;

  return res.json(chat);
};

export const deleteChat = (req, res, next) => {
  const chat = req.chat;

  throw new Error('#TODO'); // TODO
};

export const forkChat = (req, res, next) => {
  const chat = req.chat;

  throw new Error('#TODO'); // TODO
};

export const forkMerge = (req, res, next) => {
  const chat = req.chat;

  throw new Error('#TODO'); // TODO
};

export const forkUpgrade = (req, res, next) => {
  const chat = req.chat;

  throw new Error('#TODO'); // TODO
};