import User from '~/models/User';

// Current logged in user.
export const whoami = (req, res, next) => {
  if (!req.user) {
    next({ message: 'Not signed in' });
  }

  return res.json(req.user);
};