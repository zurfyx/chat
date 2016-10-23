import Message from '~/models/Message';

export const isMessageIdValid = (req, res, next) => {
  Message.findOne({ _id: req.params._id }, (err, message) => {
    if (err) return res.status(500).json({ error: err });

    if (!message) {
      return res.status(500).json({ error: { message: 'Message not found.' } });
    }

    req.message = message;
    next();
  });
};

export const isMessageOwner = (req, res, next) => {
  const _id = req.params._id;
  const user = req.user;

  Message.findOne({ _id, owner: user }, (err, message) => {
    if (err) return res.status(500).json({ error: err });

    if (!message) {
      const message = 'Either the message does not exist or you are not its owner.';
      return res.status(500).json({ error: { message } });
    }

    req.message = message;
    next();
  });
};