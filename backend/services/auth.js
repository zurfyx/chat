import { ApiError } from '~/helpers/api';

export function findAuthentication(currentUser) {
  if (!currentUser) {
    throw new ApiError('Not signed in');
  }

  return currentUser;
}
