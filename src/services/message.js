import validator from 'validator';

import { isId } from '~/helpers/validation';
import { emitToRoom } from '~/helpers/socket';
import Message from '~/models/Message';

/**
 * Given a messageId string identifier, finds its chat object.
 */
export function findMessage(messageId, otherParams) {
  if (!isId(messageId)) {
    throw 'Message ID is invalid.';
  }

  const params = Object.assign({ _id: messageId}, otherParams);
  return Message.findOne(params).exec().then((message) => {
    if (!message) throw 'No message matched the given parameters.';

    return message;
  });
}

/**
 * Given an existing userId and chatId, save a new message with the given string
 * content.
 */
export function createMessage(userId, chatId, content, contentType, contentTypeSpecifics) {
  const sanitizedContent = validator.trim(content);

  if (validator.isEmpty(content)) {
    throw 'Message cannot be empty.';
  }

  const newMessage = new Message();
  newMessage.owner = userId;
  newMessage.chat = chatId;
  newMessage.content = sanitizedContent;
  newMessage.contentType = contentType;
  newMessage.contentTypeSpecifics = contentTypeSpecifics;

  return newMessage.save();
}

/**
 * Emit a message to everyone in the room.
 * Emission will run in background.
 */
export function emitMessage(roomId, message) {
  return emitToRoom(roomId, 'ReceiveMessage', message);
}