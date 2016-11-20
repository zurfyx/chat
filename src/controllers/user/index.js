import { isAuthenticated } from '~/services/auth';
import { findUser as findUserService } from '~/services/user';

// Current logged in user.
export const whoami = (currentUser) => {
  return isAuthenticated(currentUser);
};

// Returns the user that matches userId.
export const find = (userId) => {
  return findUserService(userId);
};