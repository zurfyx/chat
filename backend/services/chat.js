import { isDate } from 'validator';

import { chain } from '~/helpers/promise';
import { isId } from '~/helpers/validate';
import { filterPermittedKeys } from '~/helpers/sanitize';
import { emitToRoom } from '~/helpers/socket';
import Chat from '~/models/Chat';
import { findMessage, createMessage } from '~/services/message';

/**
 * Given a chatId string identifier, finds its chat object.
 */
export function findChat(chatId) {
  if (!isId(chatId)) {
    throw 'Chat ID is invalid';
  }

  return Chat.findOne({ _id: chatId }).then((chat) => {
    if (!chat) throw 'No chat matched the given chatId';

    return chat;
  });
}

export function createChat(values) {
  // TODO: input validation.
  const newChat = new Chat();
  newChat.room = values.room;
  newChat.parent = values.parent;
  newChat.title = values.title;
  newChat.description = values.description;
  newChat.github = values.github;

  return newChat.save();
}

/**
 * Given a chatId, update the chat entry with the provided values.
 * @param chatId Chat identifier.
 * @param values Values object. Valid keys: title, description,
 * firstMessageDate, lastMessageDate, sticky.
 * Only the given fields will be updated on the database, since we are expecting
 * a huge numbers of updates.
 */
export function editChat(chatId, values) {
  const validKeys = ['title', 'description', 'firstMessageDate',
    'lastMessageDate', 'sticky', 'closed'];
  const permittedValues = filterPermittedKeys(validKeys, values);

  if (permittedValues.firstMessageDate && !isDate(permittedValues.firstMessageDate)) {
    throw 'Invalid first message date.';
  }

  if (permittedValues.lastMessageDate && !isDate(permittedValues.lastMessageDate)) {
    throw 'Invalid last message date.';
  }

  // Async. validation and submission
  return chain
    .then(() => {
      // If there's a sticky to update, make sure the reference does exist
      // and that the message belongs to that chat.
      if (!permittedValues.sticky) return;
      return findMessage(permittedValues.sticky, { chat: chatId });
    })
    .then(() => {
      return Chat.findOneAndUpdate({ _id: chatId }, { $set: permittedValues },
        { new: true }).exec();
    });
}

export function emitChat(roomId, chat) {
  return emitToRoom(roomId, 'ReceiveChat', chat);
}

/**
 * Create a new chat fork from a chatId and and an optional initialMessage.
 * @param userId Creator of the chat, and the initialMessage. It must be an existing user
 * identifier.
 * @param chatId Parent chat id. It must be an existing chat identifier.
 * @param initialMessage Initial message. Will be sticked.
 */
export function forkChat(userId, parentChatId, chatTitle, initialMessageValues) {
  let forkedChat;
  return chain
    .then(() => findChat(parentChatId))
    .then((parentChat) => createChat({ room: parentChat.room, parent: parentChatId, title: chatTitle }))
    .then((chat) => createMessage(userId, chat._id, initialMessageValues))
    .then((message) => editChat(message.chat, { sticky: message._id }));
}

export function forkMergeChat(userId, chatId) {
  return chain
    .then(() => editChat(chatId, { closed: true }))
    .then((chat) => createMessage(userId, chat.parent, { 
      content: `Chat ${chat._id} was merged.`,
      type: 'fork',
      specifics: { chat: chat._id },
    }))
    .then((message) => createMessage(userId, chatId, {
      content: `Chat was merged into ${message.chat}.`,
      type: 'plain',
    }));
}