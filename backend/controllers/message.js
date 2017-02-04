import Message from '~/models/Message';

import { chain } from '~/helpers/promise';
import { ApiError } from '~/helpers/api';
import { findAuthentication } from '~/services/auth';
import { findChat } from '~/services/chat';
import { createMessage, emitMessage } from '~/services/message';

export const messages = (req, res, next) => {
  const chat = req.chat;

  Message.find({ chat }, (err, chats) => {
    if (err) next(err);

    return res.json(chats);
  });
};

// Create a new message, and emit it to all connected users in the room.
export const create = (currentUserId, chatId, messageValues) => {
  let roomId;
  return chain
    .then(() => findAuthentication(currentUserId))
    .then(() => findChat(chatId))
    .then((chat) => roomId = chat.room)
    .then(() => createMessage(currentUserId, chatId, messageValues))
    .then((message) => emitMessage(roomId, message));
};

export const editMessage = (req, res, next) => {
  const message = req.message;

  throw new ApiError('#TODO'); // TODO
};

export const deleteMessage = (req, res, next) => {
  const message = req.message;
  const isMemberOfRoom = message.chat.room.members.indexOf(req.user);

  if (!isMemberOfRoom) {
    return next('You are not a member of the room anymore.');
  }

  message.deletedAt = Date();

  message.save((err, newMessage) => {
    if (err) next(err);

    return res.json({ message: 'OK' });
  });
};