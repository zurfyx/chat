import Chat from '~/models/Chat';

export const chats = (req, res, next) => {
  const room = req.room;

  Chat.find({ room }, (err, chats) => {
    if (err) next(err);

    return res.json(chats);
  });
};

export const createChat = (req, res, next) => {
  const room = req.room;

  req.checkBody('title', 'Title cannot be blank').notEmpty();
  req.sanitize('title').trim();
  req.sanitize('description').trim();

  // TODO GitHub

  const errors = req.validationErrors();
  if (errors) {
    return next(errors);
  }

  const newChat = new Chat();
  newChat.room = room;
  newChat.title = req.body.title;
  newChat.description = req.body.description;

  newChat.save((err, chat) => {
    if (err) return next(err);

    return res.json(chat);
  });
};

export const getChat = (req, res, next) => {
  const chat = req.chat;

  return res.json(chat);
};

export const deleteChat = (req, res, next) => {
  const chat = req.chat;

  throw new Error('#TODO'); // TODO
};

export const forkChat = (req, res, next) => {
  const chat = req.chat;

  throw new Error('#TODO'); // TODO
};

export const forkMerge = (req, res, next) => {
  const chat = req.chat;

  throw new Error('#TODO'); // TODO
};

export const forkUpgrade = (req, res, next) => {
  const chat = req.chat;

  throw new Error('#TODO'); // TODO
};