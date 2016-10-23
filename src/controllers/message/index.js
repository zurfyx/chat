import Message from '~/models/Message';

export const messages = (req, res, next) => {
  const chat = req.chat;

  Message.find({ chat }, (err, chats) => {
    if (err) next(err);

    return res.json(chats);
  });
};

export const createMessage = (req, res, next) => {
  const chat = req.chat;
  const user = req.user;

  req.checkBody('content', 'Content cannot be blank').notEmpty();
  req.sanitize('content').trim();

  const newMessage = new Message();
  newMessage.chat = chat;
  newMessage.owner = user;
  newMessage.content = req.body.content;

  newMessage.save((err, message) => {
    if (err) return next(err);

    return res.json(message);
  })
};

export const editMessage = (req, res, next) => {
  const message = req.message;

  throw new Error('#TODO'); // TODO
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