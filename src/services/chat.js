import { isDate } from 'validator';

import { chain } from '~/helpers/promise';
import { isId } from '~/helpers/validation';
import { filterPermittedKeys } from '~/helpers/validation';
import Chat from '~/models/Chat';
import { findMessage } from '~/services/message';

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
    'lastMessageDate', 'sticky'];
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
      console.info(permittedValues);
      return Chat.findOneAndUpdate({ _id: chatId }, { $set: permittedValues },
        { new: true }).exec();
    });
}