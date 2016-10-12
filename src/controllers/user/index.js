import User from '~/models/User';

// Current logged in user.
export const getWhoami = (req, res, next) => {
  return (req.user)
    ? res.json(req.user)
    : res.status(401).json({ error: 'Not signed in' });
};