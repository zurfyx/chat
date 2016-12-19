import { expect } from 'chai';

import { chain } from '~/helpers/promise';
import Message from'~/models/Message';
import { createAndSignin } from './auth';
import { createRoom } from './room';
import { createChat } from './chat';

describe('Message', () => {
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
      .then(() => createChat(room))
      .then((createdChat) => chat = createdChat)
      .then(() => done())
      .catch((error) => console.error(error));
  });

  describe('POST /chats/:_id/messages', () => {
    it ('should create a new message', (done) => {
      request
        .post(`${server}/chats/${chat._id}/messages`)
        .send({ chat: chat._id, type: 'plain', content: 'some content' })
        .end((err, res) => {
          if (err) throw `Request error: ${err}`;
          expect(res.body.content).to.equal(String('some content'));
          return done();
        });
    });
  });
});

export function createMessage(chat, owner) {
  const message = new Message();
  message.content = 'random text';
  message.chat = chat;
  message.owner = owner;
  message.type = 'plain';
  return message.save();
}