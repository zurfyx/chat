// Execute only on development.
export function dev(fun) {
  if (process.env.NODE_ENV !== 'production') {
    return fun();
  }
}

export function infoDev(message) {
  return dev(() => console.info(message));
}

export function errorDev(message) {
  return dev(() => console.error(message));
}