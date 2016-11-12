import Room from '~/models/Room';
import Chat from '~/models/Chat';
import Message from '~/models/Message';

const roomConnections = {}; // { roomId: Set([socket, ...]) }.

export default function connectionHandler(socket) {
  const userId = socket.handshake.session.passport && socket.handshake.session.passport.user;
  let enteredRoomId;

  if (process.env.NODE_ENV !== 'production') {
    console.info(`⚡︎ New connection: ${userId}`);
  }

  // Give the user a warm welcome.
  socket.emit('UserID', userId);

  // Handle disconnection.
  socket.on('disconnect', () => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`⚡︎ Disconnection: ${userId}`);
    }
    leaveRoom();
  });

  /*
   * Listen for user commands.
   */

  socket.on('EnterRoom', (slug, callback) => {
    console.info('enter room');

    // Leave any previous entered Room first.
    leaveRoom();

    Room.find({ slug }, (err, room) => {
      if (err) return socket.emit('EnterRoomError', 'There was an error finding the room.');
      if (!room) return socket.emit('EnterRoomError', 'The room does not exist');

      // Enter the room.
      enteredRoomId = room._id;
      if (!roomConnections[enteredRoomId]) {
        roomConnections[enteredRoomId] = new Set();
      }
      roomConnections[enteredRoomId].add(socket);

      return callback(room);
    });
  });

  socket.on('SendMessage', (data, callback) => {
    console.info('send message');
    const { chatId, content } = data;

    Chat.findOne({ _id: chatId }, (err, chat) => {
      if (err) return socket.emit('SendMessageError', 'There was an error sending your message');
      if (!chat) return socket.emit('SendMessageError', 'The chat does not exist');

      // Save message in the DB.
      const newMessage = new Message();
      newMessage.chat = chat;
      newMessage.owner = userId;
      newMessage.content = content;

      newMessage.save((err, message) => {
        if (err) return console.info(err) && socket.emit('SendMessageError', 'There was an error saving your message.');

        // Message saving succeeded.
        callback(newMessage);

        // Send message to other online users.
        emitMessage(chat.room._id, message);
      });
    });
  });

  /*
   * Functions.
   */

  // Remove connection from the previous room (if any).
  function leaveRoom() {
    if (enteredRoomId) {
      const roomMembers = roomConnections[enteredRoomId];
      roomMembers.delete(socket);
    }
  }

  // Emit a message to all room users.
  function emitMessage(roomId, message) {
    const membersList = roomConnections[roomId];
    if (membersList) {
      membersList.forEach((socket) => {
        socket.emit('ReceiveMessage', message);
      });
    }
  }
}