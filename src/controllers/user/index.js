import User from '~/models/User';

// Current logged in user.
export const getWhoami = (req, res, next) => {
  res.json(req.user || {});
};