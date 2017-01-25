export function isAuthenticated (currentUser) {
  return new Promise((resolve, reject) => {
    return currentUser ? resolve(currentUser) : reject('Not signed in');
  });
}