import User from '~/models/User';

// Current logged in user.
export const whoami = (req, res, next) => {
  return res.json(req.user);
};