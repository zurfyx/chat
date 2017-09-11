import { infoDev } from '~/helpers/development';
import { chain } from '~/helpers/promise';
import store from '~/store';
import { addSocketToRoom, removeSocketFromRoom } from '~/store/room';
import * as user from '~/controllers/user';
import * as room from '~/controllers/room';
import * as message from '~/controllers/message';
import * as chat from '~/controllers/chat';
import * as webhook from '~/controllers/webhook';

/**
 * Handles controller execution and responds to user (socket version).
 * This way controllers are not attached to the socket.
 * API has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => (data, acknowledgement) => {
  const boundParams = params(data);

  if (!acknowledgement) {
    return promise(...boundParams);
  }

  return promise(...boundParams)
    .then((result) => acknowledgement(result))
      .catch((error) => {
      console.error(error);
      return acknowledgement({error});
    });
};
const c = controllerHandler; // Just a name shortener.

export default function connectionHandler(socket) {
  const userId = socket.handshake.session.passport && socket.handshake.session.passport.user;
  let enteredRoomId;

  infoDev(`⚡︎ New connection: ${userId}`);

  /**
   * Listen for user commands.
   */
  socket.on('disconnect', () => {
    infoDev(`⚡︎ Disconnection: ${userId}`);
    if (enteredRoomId) {
      store.dispatch(removeSocketFromRoom(enteredRoomId, socket));
    }
  });

  socket.on('UserID', (callback) => callback(userId));

  socket.on('GetUser', c(user.find, (data) => [data._id]));

  /**
   * Socket will join (and listen) the given room notifications.
   * EnterRoom is a unique event that has no equivalent in the API.
   */
  socket.on('EnterRoom', c((slug) => {
    let enteredRoom;

    return chain
      .then(() => {
        if (enteredRoomId) {
          return store.dispatch(removeSocketFromRoom(enteredRoomId, socket));
        }
      })
      .then(() => room.findBySlug(slug))
      .then((room) => {
        enteredRoomId = room._id;
        enteredRoom = room;

        return store.dispatch(addSocketToRoom(enteredRoomId, socket));
      })
      .then(() => enteredRoom);
  }, (data) => [data]));

  socket.on('SendMessage', c(message.create, (data) => [userId, data.chatId, data]));

  socket.on('EditChat', c(chat.edit, (data) => [userId, data._id, data]));

  socket.on('GetWebhook', c(webhook.githubFind, (data) => [`${data.repository}`]));
}