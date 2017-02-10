import { chain } from '~/helpers/promise';
import { findAuthentication } from '~/services/auth';
import { findUsers, findUser } from '~/services/user';

// Current logged in user.
export const whoami = (currentUser) => {
  return chain
    .then(() => findAuthentication(currentUser))
    .then(() => findUser(currentUser._id));
};

// Returns all users.
export async function users() {
  return await findUsers();
}

// Returns the user that matches userId.
export const find = (userId) => {
  return chain
    .then(() => findUser(userId));
};