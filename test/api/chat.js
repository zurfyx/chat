import { expect } from 'chai';

import { chain } from '~/helpers/promise';
import User from '~/models/User';
import Room from '~/models/Room';
import Chat from '~/models/Chat';
import Message from'~/models/Message';
import { createAndSignin } from './auth';

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
      .then(() => done());
  });

  afterEach((done) => {
    chain
      .then(() => User.remove({}))
      .then(() => Room.remove({}))
      .then(() => done());
  });

  describe('PATCH /chat/:_id', () => {
    beforeEach((done) => {
      // Create a sample Chat to work with.
      chain
        .then(() => createChat(room))
        .then((createdChat) => chat = createdChat)
        .then(() => done());
    });

    afterEach((done) => {
      chain
        .then(() => Chat.remove({}))
        .then(() => Message.remove({}))
        .then(() => done());
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

export function createRoom(owner) {
  const room = new Room();
  room.title = 'sample';
  room.slug = 'sample';
  room.owner = owner;
  return room.save();
}

export function createChat(room) {
  const chat = new Chat();
  chat.room = room;
  return chat.save();
}

export function createMessage(chat, owner) {
  const message = new Message();
  message.content = 'random text';
  message.chat = chat;
  message.owner = owner;
  message.contentType = 'plain';
  return message.save();
}