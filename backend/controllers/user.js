import { isAuthenticated } from '~/services/auth';
import { findUsers, findUser } from '~/services/user';

// Current logged in user.
export const whoami = (currentUser) => {
  return isAuthenticated(currentUser)
    .then(() => findUser(currentUser._id));
};

// Returns all users.
export const users = () => {
  return findUsers();
};

// Returns the user that matches userId.
export const find = (userId) => {
  return findUser(userId);
};