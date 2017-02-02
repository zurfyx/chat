import debug from 'debug';

const LOG_PREFIX = 'api';

const info = debug(`${LOG_PREFIX}:info`);
const dev = debug(`${LOG_PREFIX}:dev`);
const error = debug(`${LOG_PREFIX}:error`);

export {
  info,
  dev,
  error,
};
