import { ApiError } from '~/helpers/api';

export function isAuthenticated(currentUser) {
  return new Promise((resolve) => {
    if (!currentUser) {
      throw new ApiError('Not signed in');
    }

    resolve(currentUser);
  });
}
