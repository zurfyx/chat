import User from '~/models/User';

// Check if user id exists on the database.
export const isUserIdValid = (req, res, next) => {
  User.findOne({ _id: req.params._id }, (err, user) => {
    if (err) return res.status(500).json({ error: err });

    if (!user) {
      return res.status(500).json({ error: { message: 'User not found.' } });
    }

    req.paramUser = user;
    next();
  });
};