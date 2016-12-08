import Chat from '~/models/Chat';

/**
 * Given a chatId string identifier, finds its chat object.
 */
export function findChat(chatId) {
  return Chat.findOne({ _id: chatId }).then((chat) => {
    if (!chat) throw 'No chat matched the given chatId';

    return chat;
  });
}