import Chat from '~/models/Chat';

// Check if chat id exists on the database.
export const isChatIdValid = (req, res, next) => {
  Chat.findOne({ _id: req.params._id }, (err, chat) => {
    if (err) return res.status(500).json({ error: err });

    if (!chat) {
      return res.status(500).json({ error: { message: 'Chat not found.' } });
    }

    req.chat = chat;
    next();
  });
};