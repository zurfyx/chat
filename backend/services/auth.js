import { ApiError } from '~/helpers/api';

export function isAuthenticated(currentUser) {
  if (!currentUser) {
    throw new ApiError('Not signed in');
  }

  return currentUser;
}
