import { expect } from 'chai';

import { chain } from '~/helpers/promise';
import Chat from '~/models/Chat';
import { createAndSignin } from './auth';
import { createRoom } from './room';
import { createMessage } from './message';

describe('Chat', () => {
  let user;
  let room;
  let chat;

  beforeEach((done) => {
    // Sign in and create a room, we will need to do this in several tests.
    chain
      .then(() => createAndSignin())
      .then((createdUser) => user = createdUser)
      .then(() => createRoom(user))
      .then((createdRoom) => room = createdRoom)
      .then(() => done())
      .catch((error) => console.error(error));
  });

  describe('PATCH /chat/:_id', () => {
    beforeEach((done) => {
      // Create a sample Chat to work with.
      chain
        .then(() => createChat(room))
        .then((createdChat) => chat = createdChat)
        .then(() => done())
        .catch((error) => console.error(error));
    });

    it('should add a sticky to a chat that does not have', (done) => {
      chain
        .then(() => createMessage(chat, user))
        .then((message) => {
          request
            .patch(`${server}/chats/${chat._id}`)
            .send({ sticky: message._id })
            .end((err, res) => {
              if (err) throw `Request error: ${err}`;
              expect(res.body.sticky).to.equal(String(message._id));
              return done();
            });
        });
    });
  });
});



export function createChat(room) {
  const chat = new Chat();
  chat.room = room;
  return chat.save();
}

